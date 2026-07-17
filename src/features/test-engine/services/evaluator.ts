import { Question } from "@prisma/client";

interface AIValuationResult {
  score: number;       // scaled score from 0.0 to 1.0 (multiplier)
  feedback: string;    // detailed grading explanation
  grammar: number;     // 0-100 rating
  coverage: number;    // 0-100 rating
  compliance: number;  // 0-100 rating
  isCorrect: boolean;  // overall success flag (e.g. score >= 0.5)
  evaluator?: string;  // which backend graded this ("groq" | "gemini" | "heuristic" | "api_failure")
}

/** Build shared system/user prompts (same for both LLM providers) */
function buildPrompts(question: Question, answerText: string) {
  const isEmail = question.topic === "Email Writing";

  const systemPrompt = isEmail
    ? `You are the official TCS NQT AI essay grader. Grade the student's email against the prompt requirements, target word count (100-150 words), professional salutations, layout (Subject, Greeting, Body, Closing), and grammar.
Return ONLY a valid JSON object:
{
  "score": 0.85,
  "feedback": "Detailed feedback on strengths, layout issues, and grammar.",
  "grammar": 90,
  "coverage": 80,
  "compliance": 100,
  "isCorrect": true
}`
    : `You are the official TCS NQT Passage Recall grader. Evaluate the student's reconstructed text against the original passage – check key numerical statistics, facts, names, and semantic meaning, and assess grammar.
Return ONLY a valid JSON object:
{
  "score": 0.75,
  "feedback": "Feedback on key facts recalled, missing numbers, and grammatical notes.",
  "grammar": 85,
  "coverage": 70,
  "compliance": 90,
  "isCorrect": true
}`;

  const userPrompt = `
[QUESTION DETAILS]
Topic: ${question.topic}
Prompt/Passage:
${question.questionText}

[CORRECT/REFERENCE ANSWER]
${question.correctOption}

[STUDENT RESPONSE]
${answerText}
`;

  return { systemPrompt, userPrompt };
}

/** Clamp and normalise the raw LLM JSON result */
function normaliseResult(
  raw: Partial<AIValuationResult>,
  evaluator: string
): AIValuationResult {
  return {
    score: Math.min(1.0, Math.max(0.0, Number(raw.score ?? 0.0))),
    feedback: String(raw.feedback || "Evaluation complete."),
    grammar: Math.min(100, Math.max(0, Number(raw.grammar ?? 0))),
    coverage: Math.min(100, Math.max(0, Number(raw.coverage ?? 0))),
    compliance: Math.min(100, Math.max(0, Number(raw.compliance ?? 0))),
    isCorrect: Boolean(raw.isCorrect),
    evaluator,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 1: Groq  (llama-3.3-70b-versatile)
// ─────────────────────────────────────────────────────────────────────────────
async function evaluateWithGroq(
  question: Question,
  answerText: string
): Promise<AIValuationResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not configured");

  const { systemPrompt, userPrompt } = buildPrompts(question, answerText);

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const resultText = data.choices?.[0]?.message?.content;
  if (!resultText) throw new Error("Empty response from Groq");

  return normaliseResult(JSON.parse(resultText), "groq");
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 2: Gemini  (gemini-1.5-flash via REST)
// ─────────────────────────────────────────────────────────────────────────────
async function evaluateWithGemini(
  question: Question,
  answerText: string
): Promise<AIValuationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const { systemPrompt, userPrompt } = buildPrompts(question, answerText);

  const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const resultText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!resultText) throw new Error("Empty response from Gemini");

  return normaliseResult(JSON.parse(resultText), "gemini");
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 3: Heuristic fallback (no network)
// ─────────────────────────────────────────────────────────────────────────────
function runHeuristicFallback(question: Question, answer: string): AIValuationResult {
  const wordCount = answer.split(/\s+/).filter(Boolean).length;

  if (question.topic === "Email Writing") {
    const hasSubject = /subject:/i.test(answer);
    const hasGreeting = /(dear|hello|hi)/i.test(answer);
    const hasRegards = /(regards|sincerely|best)/i.test(answer);

    let compliance = 50;
    if (hasSubject) compliance += 15;
    if (hasGreeting) compliance += 15;
    if (hasRegards) compliance += 20;

    let wordCountScore = 100;
    if (wordCount < 100) {
      wordCountScore = Math.max(20, 100 - (100 - wordCount) * 1.5);
    } else if (wordCount > 150) {
      wordCountScore = Math.max(20, 100 - (wordCount - 150) * 1.5);
    }

    const avgScore = (compliance + wordCountScore) / 200;
    return {
      score: Number(avgScore.toFixed(2)),
      feedback: `[Heuristic Grade] Word count: ${wordCount} words (ideal 100-150). Subject: ${hasSubject ? "Yes" : "No"}, Greeting: ${hasGreeting ? "Yes" : "No"}, Sign-off: ${hasRegards ? "Yes" : "No"}.`,
      grammar: 80,
      coverage: 70,
      compliance: Math.round(wordCountScore),
      isCorrect: avgScore >= 0.5,
      evaluator: "heuristic",
    };
  } else {
    const referenceWords = new Set(
      question.correctOption.toLowerCase().split(/\W+/).filter((w) => w.length > 4)
    );
    const studentWords = new Set(
      answer.toLowerCase().split(/\W+/).filter((w) => w.length > 4)
    );

    let matches = 0;
    referenceWords.forEach((w) => { if (studentWords.has(w)) matches++; });

    const overlapPercent = referenceWords.size > 0 ? (matches / referenceWords.size) * 100 : 0;
    const score = Number((overlapPercent / 100).toFixed(2));

    return {
      score,
      feedback: `[Heuristic Grade] Recalled ~${overlapPercent.toFixed(1)}% of key passage vocabulary (${matches} key terms matched).`,
      grammar: 85,
      coverage: Math.round(overlapPercent),
      compliance: 80,
      isCorrect: score >= 0.4,
      evaluator: "heuristic",
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 4: Total API failure — answer is passed automatically
// ─────────────────────────────────────────────────────────────────────────────
function apiFailed(): AIValuationResult {
  return {
    score: 1.0,
    feedback: "Passed due to API failure. Both Groq and Gemini evaluation services were unavailable at the time of submission. Your response has been automatically marked as passed.",
    grammar: 100,
    coverage: 100,
    compliance: 100,
    isCorrect: true,
    evaluator: "api_failure",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ENTRY: 3-tier cascade → Groq → Gemini → Heuristic → Auto-pass
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Evaluates a student's written verbal answer using a three-tier fallback chain:
 *   1. Groq API  (llama-3.3-70b-versatile)
 *   2. Gemini API  (gemini-1.5-flash) — if Groq is rate-limited or down
 *   3. Heuristic regex analysis — if both APIs fail
 *   4. Auto-pass — if heuristic itself throws (should never happen)
 */
export async function evaluateVerbalAnswer(
  question: Question,
  studentAnswer: string
): Promise<AIValuationResult> {
  const answerText = (studentAnswer || "").trim();

  if (!answerText) {
    return {
      score: 0.0,
      feedback: "No response was submitted.",
      grammar: 0,
      coverage: 0,
      compliance: 0,
      isCorrect: false,
      evaluator: "none",
    };
  }

  // ── Tier 1: Groq ──────────────────────────────────────────────────────────
  try {
    console.log("[Evaluator] Attempting Groq evaluation...");
    return await evaluateWithGroq(question, answerText);
  } catch (groqErr) {
    console.warn("[Evaluator] Groq failed:", (groqErr as Error).message);
  }

  // ── Tier 2: Gemini ────────────────────────────────────────────────────────
  try {
    console.log("[Evaluator] Falling back to Gemini evaluation...");
    return await evaluateWithGemini(question, answerText);
  } catch (geminiErr) {
    console.warn("[Evaluator] Gemini failed:", (geminiErr as Error).message);
  }

  // ── Tier 3: Heuristic ─────────────────────────────────────────────────────
  try {
    console.log("[Evaluator] Both APIs unavailable. Running heuristic fallback...");
    return runHeuristicFallback(question, answerText);
  } catch (heuristicErr) {
    console.error("[Evaluator] Heuristic evaluation failed:", heuristicErr);
  }

  // ── Tier 4: Auto-pass ─────────────────────────────────────────────────────
  console.error("[Evaluator] All evaluation methods failed. Auto-passing response.");
  return apiFailed();
}
