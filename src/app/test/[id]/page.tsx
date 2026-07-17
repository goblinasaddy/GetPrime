import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { TestContainer } from "@/features/test-engine/components/test-container";

interface TestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const { id } = await params;

  // 1. Verify Authentication
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // 2. Fetch Session & Configuration
  const session = await prisma.examSession.findUnique({
    where: { id },
    include: {
      config: true,
    },
  });

  if (!session || session.userId !== user.id) {
    redirect("/");
  }

  // If already finished, redirect to results page
  if (session.status !== "IN_PROGRESS") {
    redirect(`/test/results/${session.id}`);
  }

  // 3. Fetch Questions and preserve locked order
  const questions = await prisma.question.findMany({
    where: {
      id: { in: session.questionsOrder },
    },
  });

  const orderedQuestions = session.questionsOrder
    .map((qId) => {
      const q = questions.find((item) => item.id === qId);
      if (!q) return null;
      return {
        id: q.id,
        section: q.section,
        topic: q.topic,
        difficulty: q.difficulty,
        questionText: q.questionText,
        options: q.options,
      };
    })
    .filter((q): q is NonNullable<typeof q> => q !== null);

  if (orderedQuestions.length === 0) {
    redirect("/");
  }

  const initialAnswers = (session.answers as any) || {};

  return (
    <TestContainer
      sessionId={session.id}
      initialAnswers={initialAnswers}
      questions={orderedQuestions}
      durationMinutes={session.config.duration}
      startedAt={session.startedAt.toISOString()}
      sectionOrder={session.config.sectionOrder}
    />
  );
}
