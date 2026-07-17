"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { joinChallengeRoom } from "@/features/challenge/actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

function ChallengeJoinContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      router.push("/");
      return;
    }

    const joinLobby = async () => {
      try {
        const upperCode = code.trim().toUpperCase();
        await joinChallengeRoom(upperCode);
        router.push(`/challenge/${upperCode}`);
      } catch (err: any) {
        setError(err.message || "Failed to join room. Verify code.");
      }
    };

    joinLobby();
  }, [code, router]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md bg-white border-border shadow-md text-center p-6 space-y-4">
          <div className="text-red-600 font-bold">Failed to Join Room</div>
          <p className="text-sm text-slate-500">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="text-xs text-primary font-semibold underline hover:text-blue-800"
          >
            Back to Dashboard
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center space-y-4">
        <Users className="w-12 h-12 text-primary mx-auto animate-bounce" />
        <h2 className="text-lg font-bold text-slate-800">Joining Challenge Room...</h2>
        <p className="text-xs text-slate-400">Verifying code and adding you to the lobby.</p>
      </div>
    </div>
  );
}

export default function ChallengeJoinPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center space-y-4">
          <Users className="w-12 h-12 text-primary mx-auto animate-bounce" />
          <h2 className="text-lg font-bold text-slate-800">Loading...</h2>
        </div>
      </div>
    }>
      <ChallengeJoinContent />
    </Suspense>
  );
}
