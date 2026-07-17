import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { ChallengeLobby } from "@/features/challenge/components/challenge-lobby";

interface ChallengeRoomPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function ChallengeRoomPage({ params }: ChallengeRoomPageProps) {
  const { code } = await params;
  const upperCode = code.toUpperCase();

  // 1. Verify Authentication
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // 2. Fetch Challenge Room
  const room = await prisma.challengeRoom.findUnique({
    where: { roomCode: upperCode },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!room) {
    redirect("/?error=RoomNotFound");
  }

  // Check if current user is already a member
  const isMember = room.members.some((m) => m.userId === user.id);

  if (!isMember) {
    // If not a member yet, redirect to join screen
    redirect(`/challenge?code=${upperCode}`);
  }

  // If already active, redirect member to their test page
  if (room.status === "ACTIVE") {
    const member = room.members.find((m) => m.userId === user.id);
    if (member?.sessionId) {
      redirect(`/test/${member.sessionId}`);
    }
  }

  // Map initial members state
  const initialMembers = room.members.map((m) => ({
    userId: m.userId,
    displayName: m.user.displayName || m.user.email.split("@")[0],
    college: m.user.college || "Amity University",
    status: m.status,
    sessionId: m.sessionId,
  }));

  return (
    <ChallengeLobby
      roomId={room.id}
      roomCode={room.roomCode}
      creatorId={room.creatorId}
      currentUserId={user.id}
      initialMembers={initialMembers}
      initialStatus={room.status}
    />
  );
}
