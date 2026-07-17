import { Question, ExamSession, ExamConfiguration } from "@prisma/client";

interface AnswerState {
  selectedOption: string | null;
  flagged?: boolean;
  visited?: boolean;
}

interface AnswersMap {
  [questionId: string]: AnswerState;
}

interface SectionSettings {
  count: number;
  easy: number;
  medium: number;
  hard: number;
  positiveScore: number;
  negativeScore: number;
}

interface ExamConfigJson {
  [sectionName: string]: SectionSettings;
}

export interface SectionAnalysis {
  section: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  accuracy: number; // percentage
}

export interface TopicAnalysis {
  topic: string;
  section: string;
  total: number;
  correct: number;
  accuracy: number;
}

export interface SessionAnalyticsResult {
  score: number;
  accuracy: number;
  timeTaken: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  sectionBreakdown: SectionAnalysis[];
  strongTopics: string[];
  weakTopics: string[];
}

/**
 * Pure function to compute full NQT performance metrics and analytics
 */
export function calculateAnalytics(
  session: ExamSession,
  config: ExamConfiguration,
  questions: Question[]
): SessionAnalyticsResult {
  const answers = session.answers as unknown as AnswersMap;
  const sectionConfig = config.sectionConfig as unknown as ExamConfigJson;

  let totalQuestions = questions.length;
  let attempted = 0;
  let correct = 0;
  let incorrect = 0;
  let totalScore = 0;

  // Initialize section trackers
  const sectionAnalysisMap: { [section: string]: Omit<SectionAnalysis, "accuracy"> } = {};
  config.sectionOrder.forEach((sec) => {
    sectionAnalysisMap[sec] = {
      section: sec,
      totalQuestions: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      score: 0,
    };
  });

  // Track by topic
  const topicMap: {
    [topic: string]: { section: string; total: number; correct: number };
  } = {};

  questions.forEach((q) => {
    const section = q.section;
    const topic = q.topic;
    const ans = answers[q.id];

    // Ensure section tracker exists
    if (!sectionAnalysisMap[section]) {
      sectionAnalysisMap[section] = {
        section,
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        score: 0,
      };
    }

    sectionAnalysisMap[section].totalQuestions++;

    // Ensure topic tracker exists
    if (!topicMap[topic]) {
      topicMap[topic] = { section, total: 0, correct: 0 };
    }
    topicMap[topic].total++;

    const isAttempted = ans && ans.selectedOption !== null && ans.selectedOption !== undefined && ans.selectedOption !== "";
    
    if (isAttempted) {
      attempted++;
      sectionAnalysisMap[section].attempted++;

      const settings = sectionConfig[section] || { positiveScore: 1.0, negativeScore: 0.0 };
      let isCorrect = false;
      let questionScore = 0;

      if ((ans as any).isCorrect !== undefined) {
        isCorrect = (ans as any).isCorrect;
        const aiScore = (ans as any).evaluation?.score ?? 1.0;
        questionScore = isCorrect ? aiScore * settings.positiveScore : 0.0;
      } else {
        const studentAns = (ans.selectedOption || "").trim().toLowerCase();
        const correctAns = (q.correctOption || "").trim().toLowerCase();
        isCorrect = studentAns === correctAns;
        questionScore = isCorrect ? settings.positiveScore : -settings.negativeScore;
      }

      if (isCorrect) {
        correct++;
        topicMap[topic].correct++;
        sectionAnalysisMap[section].correct++;
      } else {
        incorrect++;
        sectionAnalysisMap[section].incorrect++;
      }
      
      sectionAnalysisMap[section].score += questionScore;
      totalScore += questionScore;
    }
  });

  // Finalize section analysis with accuracy
  const sectionBreakdown: SectionAnalysis[] = Object.values(sectionAnalysisMap).map((sec) => {
    const accuracy = sec.attempted > 0 ? (sec.correct / sec.attempted) * 100 : 0;
    return {
      ...sec,
      accuracy,
    };
  });

  // Calculate strong and weak areas by topic
  const strongTopics: string[] = [];
  const weakTopics: string[] = [];

  Object.entries(topicMap).forEach(([topicName, data]) => {
    const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
    if (accuracy >= 75) {
      strongTopics.push(topicName);
    } else if (accuracy < 50) {
      weakTopics.push(topicName);
    }
  });

  const overallAccuracy = attempted > 0 ? (correct / attempted) * 100 : 0;

  // Time taken (fall back to duration if session ended or completed)
  let timeTaken = session.timeTaken || 0;
  if (!timeTaken && session.completedAt) {
    timeTaken = Math.floor(
      (new Date(session.completedAt).getTime() - new Date(session.startedAt).getTime()) / 1000
    );
  }

  return {
    score: Math.max(0, totalScore), // score cannot be negative
    accuracy: overallAccuracy,
    timeTaken,
    totalQuestions,
    attempted,
    correct,
    incorrect,
    sectionBreakdown,
    strongTopics,
    weakTopics,
  };
}
