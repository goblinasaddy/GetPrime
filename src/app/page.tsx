import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { ProfileSetup } from "@/features/auth/components/profile-setup";
import { DashboardContainer } from "@/features/dashboard/components/dashboard-container";

export default async function HomePage() {
  // 1. Verify Authentication
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // 2. Fetch or Sync Profile
  let profile = await prisma.profile.findUnique({
    where: { id: user.id },
  });

  if (!profile) {
    // Auto-create a minimal profile on first login (real Supabase user)
    profile = await prisma.profile.create({
      data: {
        id: user.id,
        email: user.email!,
        displayName:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "Student",
        avatarUrl: user.user_metadata?.avatar_url ?? null,
        college: null,
        graduationYear: null,
      },
    });
  }

  // 3. Prompt profile setup if incomplete
  const hasIncompleteProfile = !profile.college || !profile.graduationYear;
  if (hasIncompleteProfile) {
    return (
      <ProfileSetup
        profile={{
          displayName: profile.displayName,
          email: profile.email,
        }}
      />
    );
  }

  // 4. Fetch Completed Sessions for Dashboard Preview
  const allSessions = await prisma.examSession.findMany({
    where: {
      status: { in: ["COMPLETED", "EXPIRED"] },
      score: { not: null },
    },
    include: {
      user: true,
      config: true,
    },
    orderBy: [
      { score: "desc" },
      { timeTaken: "asc" },
    ],
  });

  // Group sessions by user and select the single best session per user.
  const bestSessionsMap: { [userId: string]: typeof allSessions[0] } = {};
  allSessions.forEach((session) => {
    const userId = session.userId;
    const existing = bestSessionsMap[userId];
    if (!existing) {
      bestSessionsMap[userId] = session;
    } else {
      const currentScore = session.score ?? 0;
      const existingScore = existing.score ?? 0;
      if (currentScore > existingScore) {
        bestSessionsMap[userId] = session;
      } else if (currentScore === existingScore) {
        const currentTime = session.timeTaken ?? Infinity;
        const existingTime = existing.timeTaken ?? Infinity;
        if (currentTime < existingTime) {
          bestSessionsMap[userId] = session;
        }
      }
    }
  });

  // Sort and limit to top 5 for the dashboard preview
  const topSessions = Object.values(bestSessionsMap)
    .sort((a, b) => {
      const scoreA = a.score ?? 0;
      const scoreB = b.score ?? 0;
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      const timeA = a.timeTaken ?? Infinity;
      const timeB = b.timeTaken ?? Infinity;
      return timeA - timeB;
    })
    .slice(0, 5);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const leaderboardPreview = topSessions.map((session, idx) => ({
    rank: idx + 1,
    name: session.user.displayName || session.user.email.split("@")[0],
    college: session.user.college || "Amity University",
    score: session.score ?? 0,
    time: formatTime(session.timeTaken ?? 0),
    accuracy: session.accuracy ?? 0,
  }));

  const defaultConfigId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

  return (
    <DashboardContainer
      profile={{
        displayName: profile.displayName || "Student",
        college: profile.college!,
        graduationYear: profile.graduationYear!,
      }}
      leaderboardPreview={leaderboardPreview}
      defaultConfigId={defaultConfigId}
    />
  );
}
