"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/features/test-engine/actions";
import { createChallengeRoom } from "@/features/challenge/actions";
import { DashboardView } from "./dashboard-view";

interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  score: number;
  time: string;
  accuracy: number;
}

interface DashboardContainerProps {
  profile: {
    displayName: string;
    college: string;
    graduationYear: number;
  };
  leaderboardPreview: LeaderboardEntry[];
  defaultConfigId: string;
}

export function DashboardContainer({
  profile,
  leaderboardPreview,
  defaultConfigId,
}: DashboardContainerProps) {
  const router = useRouter();

  const handleStartTest = async () => {
    try {
      const sessionId = await createSession(defaultConfigId, "MOCK");
      router.push(`/test/${sessionId}`);
    } catch (err) {
      console.error("Failed to start test:", err);
      alert("Error starting test. Please try again.");
    }
  };

  const handleCreateChallenge = async () => {
    try {
      const roomCode = await createChallengeRoom(defaultConfigId);
      router.push(`/challenge/${roomCode}`);
    } catch (err) {
      console.error("Failed to create challenge:", err);
      alert("Error creating challenge room. Please try again.");
    }
  };

  return (
    <DashboardView
      profile={profile}
      leaderboardPreview={leaderboardPreview}
      onStartTest={handleStartTest}
      onCreateChallenge={handleCreateChallenge}
    />
  );
}
