"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { generatePaper } from "@/features/test-engine/services/paper-generator";
import { revalidatePath } from "next/cache";

function generateRoomCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createChallengeRoom(configId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Generate locked questions for the room
  const questions = await generatePaper(configId);
  const questionsOrder = questions.map((q) => q.id);

  let roomCode = generateRoomCode();
  let existing = await prisma.challengeRoom.findUnique({
    where: { roomCode },
  });

  // Ensure unique code
  while (existing) {
    roomCode = generateRoomCode();
    existing = await prisma.challengeRoom.findUnique({
      where: { roomCode },
    });
  }

  const room = await prisma.challengeRoom.create({
    data: {
      roomCode,
      configId,
      creatorId: user.id,
      status: "CREATED",
      questionsOrder,
    },
  });

  // Creator joins the room as a member and is automatically ready
  await prisma.challengeMember.create({
    data: {
      roomId: room.id,
      userId: user.id,
      status: "READY",
    },
  });

  return roomCode;
}

export async function joinChallengeRoom(roomCode: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const upperCode = roomCode.trim().toUpperCase();
  const room = await prisma.challengeRoom.findUnique({
    where: { roomCode: upperCode },
  });

  if (!room) {
    throw new Error("Challenge room not found");
  }

  if (room.status !== "CREATED" && room.status !== "PLAYERS_JOINED") {
    throw new Error("Cannot join a challenge that has already started");
  }

  // Register as member
  await prisma.challengeMember.upsert({
    where: {
      roomId_userId: {
        roomId: room.id,
        userId: user.id,
      },
    },
    update: {
      status: "JOINED", // Reset status if they left and rejoined
    },
    create: {
      roomId: room.id,
      userId: user.id,
      status: "JOINED",
    },
  });

  // Update room status if players have joined
  await prisma.challengeRoom.update({
    where: { id: room.id },
    data: {
      status: "PLAYERS_JOINED",
    },
  });

  return room.id;
}

export async function toggleReadyStatus(roomId: string, ready: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await prisma.challengeMember.update({
    where: {
      roomId_userId: {
        roomId,
        userId: user.id,
      },
    },
    data: {
      status: ready ? "READY" : "JOINED",
    },
  });

  // Check if all joined members are now ready
  const members = await prisma.challengeMember.findMany({
    where: { roomId },
  });

  const allReady = members.every((m) => m.status === "READY");
  
  if (allReady && members.length > 1) {
    await prisma.challengeRoom.update({
      where: { id: roomId },
      data: {
        status: "READY",
      },
    });
  } else {
    // If not all ready but some joined, revert status to PLAYERS_JOINED
    await prisma.challengeRoom.update({
      where: { id: roomId },
      data: {
        status: "PLAYERS_JOINED",
      },
    });
  }
}

export async function startChallengeCountdown(roomId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const room = await prisma.challengeRoom.findUnique({
    where: { id: roomId },
  });

  if (!room || room.creatorId !== user.id) {
    throw new Error("Only the creator can start the countdown");
  }

  await prisma.challengeRoom.update({
    where: { id: roomId },
    data: {
      status: "COUNTDOWN",
    },
  });
}

export async function initializeChallengeExam(roomId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const room = await prisma.challengeRoom.findUnique({
    where: { id: roomId },
    include: {
      members: true,
    },
  });

  if (!room) throw new Error("Room not found");

  // Create an ExamSession for each member sharing the same locked paper (if not already created)
  for (const member of room.members) {
    if (!member.sessionId) {
      const session = await prisma.examSession.create({
        data: {
          userId: member.userId,
          configId: room.configId,
          type: "CHALLENGE",
          status: "IN_PROGRESS",
          answers: {},
          questionsOrder: room.questionsOrder,
        },
      });

      await prisma.challengeMember.update({
        where: { id: member.id },
        data: {
          sessionId: session.id,
        },
      });
    }
  }

  // Set room status to ACTIVE
  await prisma.challengeRoom.update({
    where: { id: roomId },
    data: {
      status: "ACTIVE",
      startedAt: new Date(),
    },
  });

  revalidatePath("/");
}
