"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { generatePaper } from "./services/paper-generator";
import { calculateAnalytics } from "./services/analytics-engine";
import { evaluateVerbalAnswer } from "./services/evaluator";
import { revalidatePath } from "next/cache";

export async function createSession(
  configId: string,
  type: "PRACTICE" | "MOCK" | "CHALLENGE",
  roomId?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Generate balanced paper
  const questions = await generatePaper(configId);
  const questionsOrder = questions.map((q) => q.id);

  const session = await prisma.examSession.create({
    data: {
      userId: user.id,
      configId,
      type,
      status: "IN_PROGRESS",
      answers: {},
      questionsOrder,
    },
  });

  // If this is for a challenge room, link the member to it
  if (roomId) {
    await prisma.challengeMember.update({
      where: {
        roomId_userId: {
          roomId,
          userId: user.id,
        },
      },
      data: {
        sessionId: session.id,
      },
    });
  }

  return session.id;
}

export async function saveAnswers(
  sessionId: string,
  answers: any,
  timeTaken: number
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const session = await prisma.examSession.findUnique({
    where: { id: sessionId },
  });

  if (!session || session.userId !== user.id) {
    throw new Error("Session not found or unauthorized");
  }

  if (session.status !== "IN_PROGRESS") {
    return; // Cannot save answers to completed sessions
  }

  await prisma.examSession.update({
    where: { id: sessionId },
    data: {
      answers,
      timeTaken,
    },
  });
}

export async function submitSession(
  sessionId: string,
  answers: any,
  timeTaken: number
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const session = await prisma.examSession.findUnique({
    where: { id: sessionId },
    include: {
      config: true,
      challengeMember: {
        select: {
          roomId: true,
        },
      },
    },
  });

  if (!session || session.userId !== user.id) {
    throw new Error("Session not found or unauthorized");
  }

  if (session.status !== "IN_PROGRESS") {
    return; // Already submitted
  }

  const durationSeconds = session.config.duration * 60;
  const elapsedSeconds = Math.floor(
    (Date.now() - new Date(session.startedAt).getTime()) / 1000
  );

  // Server-side validation of time
  let status = "COMPLETED";
  if (elapsedSeconds > durationSeconds + 15) {
    status = "EXPIRED"; // Exceeded duration with grace period
  }

  // Fetch full questions to calculate score
  const questions = await prisma.question.findMany({
    where: {
      id: { in: session.questionsOrder },
    },
  });

  // Evaluate open-ended questions using Groq AI Evaluation Service
  const evaluatedAnswers = { ...answers };
  for (const q of questions) {
    const ans = evaluatedAnswers[q.id];
    if (ans && ans.selectedOption) {
      const isTypingEval = q.topic === "Passage Recall" || q.topic === "Email Writing";
      if (isTypingEval) {
        try {
          const evalResult = await evaluateVerbalAnswer(q, ans.selectedOption);
          ans.evaluation = {
            score: evalResult.score,
            feedback: evalResult.feedback,
            grammar: evalResult.grammar,
            coverage: evalResult.coverage,
            compliance: evalResult.compliance,
          };
          ans.isCorrect = evalResult.isCorrect;
        } catch (err) {
          console.error(`AI evaluation failed for question ${q.id}:`, err);
        }
      }
    }
  }

  // Calculate results using Analytics Engine
  const analytics = calculateAnalytics(
    {
      ...session,
      answers: evaluatedAnswers,
      timeTaken,
    },
    session.config,
    questions
  );

  const completedAt = new Date();

  await prisma.examSession.update({
    where: { id: sessionId },
    data: {
      status,
      answers: evaluatedAnswers,
      timeTaken: Math.min(timeTaken, durationSeconds),
      completedAt,
      score: analytics.score,
      accuracy: analytics.accuracy,
      sectionScores: analytics.sectionBreakdown as any,
    },
  });

  // If this belongs to a challenge room, check if the room should be marked as completed
  if (session.challengeMember?.roomId) {
    const roomId = session.challengeMember.roomId;
    
    // Fetch all members in this room
    const members = await prisma.challengeMember.findMany({
      where: { roomId },
      include: {
        session: true,
      },
    });

    const allFinished = members.every(
      (m) => m.session && m.session.status !== "IN_PROGRESS"
    );

    if (allFinished) {
      await prisma.challengeRoom.update({
        where: { id: roomId },
        data: {
          status: "COMPLETED",
        },
      });
    }
  }

  revalidatePath("/");
  revalidatePath(`/test/results/${sessionId}`);
}
