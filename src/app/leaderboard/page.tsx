import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Trophy, ArrowLeft, Award, School } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function LeaderboardPage() {
  // 1. Verify Authentication
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // 2. Fetch Completed Sessions
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

  // Filter for scores above 50% of the maximum possible score
  const sessions = allSessions
    .filter((session) => {
      const sectionConfig = session.config?.sectionConfig as any;
      if (!sectionConfig) return false;

      let maxScore = 0;
      Object.values(sectionConfig).forEach((sec: any) => {
        const count = Number(sec.count || 0);
        const positiveScore = Number(sec.positiveScore || 0);
        maxScore += count * positiveScore;
      });

      if (maxScore === 0) return false;
      const currentScore = session.score || 0;

      return currentScore >= 0.5 * maxScore;
    })
    .slice(0, 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 border-b border-blue-900 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold tracking-tight">GetPrime</span>
        </div>
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-200 hover:text-white hover:bg-blue-800 border border-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Global Leaderboard</h1>
            <p className="text-slate-500 text-sm">Ranked by Highest Score and then Lowest Completion Time.</p>
          </div>
        </div>

        <Card className="bg-white border-border shadow-md overflow-hidden">
          <CardHeader className="border-b border-border bg-slate-50/30">
            <CardTitle className="text-lg font-bold text-slate-800">Top 100 Performers</CardTitle>
            <CardDescription>Live rankings updated every minute.</CardDescription>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border text-slate-500 font-semibold uppercase tracking-wider text-xxs">
                  <th className="p-4 w-16 text-center">Rank</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">College</th>
                  <th className="p-4 text-center">Score</th>
                  <th className="p-4 text-center">Time</th>
                  <th className="p-4 text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 italic">
                      No test sessions completed yet. Start a test and claim rank 1!
                    </td>
                  </tr>
                ) : (
                  sessions.map((session, index) => {
                    const rank = index + 1;
                    const isCurrentUser = session.userId === user.id;

                    return (
                      <tr
                        key={session.id}
                        className={`hover:bg-slate-50/50 transition-colors ${
                          isCurrentUser ? "bg-blue-50/40 hover:bg-blue-50/60 font-medium" : ""
                        }`}
                      >
                        <td className="p-4 text-center">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs mx-auto ${
                              rank === 1 ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
                              rank === 2 ? "bg-slate-100 text-slate-600 border border-slate-200" :
                              rank === 3 ? "bg-amber-100 text-amber-700 border border-amber-200" :
                              "text-slate-500"
                            }`}
                          >
                            {rank}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800">
                              {session.user.displayName || session.user.email.split("@")[0]}
                              {isCurrentUser && (
                                <span className="ml-1.5 text-xxs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase">
                                  You
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-500">
                          <div className="flex items-center space-x-1">
                            <School className="w-3.5 h-3.5 text-slate-400" />
                            <span>{session.user.college || "Amity University"}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-bold text-slate-900">
                          {session.score?.toFixed(1) ?? "0.0"} pts
                        </td>
                        <td className="p-4 text-center text-slate-600 font-semibold">
                          {formatTime(session.timeTaken ?? 0)}
                        </td>
                        <td className="p-4 text-right text-slate-700 font-semibold">
                          {session.accuracy?.toFixed(1) ?? "0.0"}%
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
