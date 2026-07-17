"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toggleReadyStatus, startChallengeCountdown, initializeChallengeExam } from "../actions";
import { Users, Award, CheckCircle, Clock, Copy, ArrowRight, Shield } from "lucide-react";

interface Member {
  userId: string;
  displayName: string;
  college: string;
  status: string; // "JOINED" | "READY"
  sessionId: string | null;
}

interface ChallengeLobbyProps {
  roomId: string;
  roomCode: string;
  creatorId: string;
  currentUserId: string;
  initialMembers: Member[];
  initialStatus: string;
}

export function ChallengeLobby({
  roomId,
  roomCode,
  creatorId,
  currentUserId,
  initialMembers,
  initialStatus,
}: ChallengeLobbyProps) {
  const router = useRouter();
  const supabase = createClient();

  const [status, setStatus] = useState(initialStatus);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [copied, setCopied] = useState(false);
  const [readyLoading, setReadyLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const isCreator = creatorId === currentUserId;
  const currentMember = members.find((m) => m.userId === currentUserId);
  const isReady = currentMember?.status === "READY";

  // Check if all players are ready
  const allReady = members.every((m) => m.status === "READY");
  const canStart = allReady && members.length > 1;

  // Real-time synchronization
  useEffect(() => {
    // 1. Fetch latest state when component mounts to prevent stale SSR state
    const fetchLatestState = async () => {
      const { data: dbMembers } = await supabase
        .from("ChallengeMember")
        .select(`
          userId,
          status,
          sessionId,
          user:Profile (displayName, college)
        `)
        .eq("roomId", roomId);

      if (dbMembers) {
        setMembers(
          dbMembers.map((m: any) => ({
            userId: m.userId,
            displayName: m.user.displayName,
            college: m.user.college,
            status: m.status,
            sessionId: m.sessionId,
          }))
        );
      }

      const { data: dbRoom } = await supabase
        .from("ChallengeRoom")
        .select("status")
        .eq("id", roomId)
        .single();
      
      if (dbRoom) {
        setStatus(dbRoom.status);
      }
    };

    fetchLatestState();

    // 2. Subscribe to ChallengeRoom and ChallengeMember tables
    const roomChannel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "ChallengeRoom", filter: `id=eq.${roomId}` },
        (payload: any) => {
          setStatus(payload.new.status);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ChallengeMember", filter: `roomId=eq.${roomId}` },
        async () => {
          // Re-fetch members list upon any changes
          const { data: updated } = await supabase
            .from("ChallengeMember")
            .select(`
              userId,
              status,
              sessionId,
              user:Profile (displayName, college)
            `)
            .eq("roomId", roomId);

          if (updated) {
            setMembers(
              updated.map((m: any) => ({
                userId: m.userId,
                displayName: m.user.displayName,
                college: m.user.college,
                status: m.status,
                sessionId: m.sessionId,
              }))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
    };
  }, [roomId, supabase]);

  // Countdown Lifecycle
  useEffect(() => {
    if (status !== "COUNTDOWN") return;

    if (countdown === 0) {
      if (isCreator) {
        // Creator triggers exam initialization for everyone
        initializeChallengeExam(roomId).catch(console.error);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, countdown, isCreator, roomId]);

  // Redirect to active test when sessionId is populated
  useEffect(() => {
    if (status === "ACTIVE") {
      const myMember = members.find((m) => m.userId === currentUserId);
      if (myMember?.sessionId) {
        router.push(`/test/${myMember.sessionId}`);
      }
    }
  }, [status, members, currentUserId, router]);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/challenge?code=${roomCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleReady = async () => {
    setReadyLoading(true);
    try {
      await toggleReadyStatus(roomId, !isReady);
    } catch (err) {
      console.error(err);
    } finally {
      setReadyLoading(false);
    }
  };

  const handleStartCountdown = async () => {
    setStartLoading(true);
    try {
      await startChallengeCountdown(roomId);
    } catch (err) {
      console.error(err);
      setStartLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-4 min-h-screen">
      {status === "COUNTDOWN" ? (
        // Coordinated Countdown State View
        <div className="text-center space-y-4 animate-pulse">
          <Clock className="w-16 h-16 text-primary mx-auto animate-spin" />
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Starting Challenge Exam</h2>
          <div className="text-7xl font-black text-primary my-6">{countdown}</div>
          <p className="text-slate-500 font-semibold">Generating locked paper. Please do not close this window.</p>
        </div>
      ) : (
        // Standard Lobby View
        <Card className="w-full max-w-xl border-border shadow-lg bg-white overflow-hidden">
          {/* Header */}
          <CardHeader className="border-b border-border bg-slate-50/50 pb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3" />
                Challenge Lobby
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Status: {status.replace("_", " ")}
              </span>
            </div>
            <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Room Code: <span className="font-mono text-primary select-all">{roomCode}</span>
            </CardTitle>
            <CardDescription className="text-slate-500 flex items-center justify-between">
              <span>Share this code or link with friends to practice together.</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="h-8 text-xs font-semibold shrink-0"
              >
                <Copy className="w-3.5 h-3.5 mr-1" />
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </CardDescription>
          </CardHeader>

          {/* Player List */}
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Joined Members ({members.length})
              </h3>
              <div className="border border-slate-100 rounded divide-y divide-slate-100 bg-slate-50/20">
                {members.map((m) => (
                  <div key={m.userId} className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-primary border border-blue-100 font-bold flex items-center justify-center text-xs">
                        {m.displayName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          {m.displayName}
                          {m.userId === creatorId && (
                            <span className="text-xxs bg-amber-50 text-amber-700 border border-amber-200 px-1 rounded flex items-center gap-0.5 font-bold">
                              <Shield className="w-2.5 h-2.5" />
                              Host
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-slate-400">{m.college}</span>
                      </div>
                    </div>

                    {/* Member Ready State */}
                    <div className="flex items-center">
                      {m.status === "READY" ? (
                        <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Ready
                        </span>
                      ) : (
                        <span className="text-xs bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-bold">
                          Not Ready
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Actions */}
            <div className="border-t border-slate-100 pt-6">
              {isCreator ? (
                <div className="space-y-3">
                  <Button
                    onClick={handleStartCountdown}
                    disabled={!canStart || startLoading}
                    className="w-full h-12 text-base font-bold flex items-center justify-center gap-2"
                  >
                    {startLoading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        START CHALLENGE
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                  {!canStart && (
                    <p className="text-center text-xs font-semibold text-slate-400">
                      Need at least 2 players, and everyone must be Ready to start.
                    </p>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleToggleReady}
                  disabled={readyLoading}
                  className={`w-full h-12 text-base font-bold transition-all ${
                    isReady
                      ? "bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300"
                      : "bg-green-600 hover:bg-green-700 text-white border-green-700"
                  }`}
                >
                  {readyLoading ? (
                    <span className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
                  ) : isReady ? (
                    "Cancel Ready"
                  ) : (
                    "Set Ready"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
