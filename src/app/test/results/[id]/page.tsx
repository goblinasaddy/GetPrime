import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { calculateAnalytics } from "@/features/test-engine/services/analytics-engine";
import { ResultsView } from "@/features/test-engine/components/results-view";

interface ResultsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { id } = await params;

  // 1. Verify Authentication
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // 2. Fetch Completed Session
  const session = await prisma.examSession.findUnique({
    where: { id },
    include: {
      config: true,
    },
  });

  if (!session || session.userId !== user.id) {
    redirect("/");
  }

  // If test is still in progress, send them back to finish
  if (session.status === "IN_PROGRESS") {
    redirect(`/test/${session.id}`);
  }

  // 3. Fetch Questions used in this test
  const questions = await prisma.question.findMany({
    where: {
      id: { in: session.questionsOrder },
    },
  });

  // Re-sort questions in locked order
  const orderedQuestions = session.questionsOrder
    .map((qId) => questions.find((q) => q.id === qId)!)
    .filter(Boolean);

  // Compute analytics dynamically
  const analytics = calculateAnalytics(session, session.config, orderedQuestions);

  // Construct reviews array
  const answers = (session.answers as any) || {};
  const reviews = orderedQuestions.map((q) => {
    const ans = answers[q.id];
    const selectedOption = ans ? ans.selectedOption : null;
    const isCorrect = ans && ans.isCorrect !== undefined ? ans.isCorrect : (selectedOption === q.correctOption);

    return {
      id: q.id,
      section: q.section,
      topic: q.topic,
      difficulty: q.difficulty,
      questionText: q.questionText,
      options: q.options,
      correctOption: q.correctOption,
      explanation: q.explanation,
      selectedOption,
      isCorrect,
      evaluation: ans ? ans.evaluation : null,
    };
  });

  return (
    <ResultsView
      score={session.score ?? analytics.score}
      accuracy={session.accuracy ?? analytics.accuracy}
      timeTaken={session.timeTaken ?? analytics.timeTaken}
      totalQuestions={analytics.totalQuestions}
      attempted={analytics.attempted}
      correct={analytics.correct}
      incorrect={analytics.incorrect}
      sectionScores={analytics.sectionBreakdown}
      strongTopics={analytics.strongTopics}
      weakTopics={analytics.weakTopics}
      reviews={reviews}
    />
  );
}
