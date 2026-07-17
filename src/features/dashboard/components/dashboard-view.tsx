"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { logout } from "@/features/auth/actions";
import { Footer } from "@/components/footer";
import { LogOut, Trophy, Users, Award, Play } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  score: number;
  time: string;
  accuracy: number;
}

interface DashboardViewProps {
  profile: {
    displayName: string;
    college: string;
    graduationYear: number;
  };
  leaderboardPreview: LeaderboardEntry[];
  onStartTest: () => Promise<void>;
  onCreateChallenge: () => Promise<void>;
}

export function DashboardView({
  profile,
  leaderboardPreview,
  onStartTest,
  onCreateChallenge,
}: DashboardViewProps) {
  const router = useRouter();
  const [testLoading, setTestLoading] = useState(false);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const quotes = [
    "Accuracy first, speed second. Master the concepts.",
    "TCS NQT requires focus under time pressure. Train like you fight.",
    "Small daily practice sessions lead to massive placement success.",
    "Keep calm. Read the question carefully before checking the options.",
    "Your hard work today is the foundation of your career tomorrow.",
  ];

  const [randomQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  const handleStartPracticeTest = async () => {
    setTestLoading(true);
    try {
      await onStartTest();
    } catch (err) {
      console.error(err);
      setTestLoading(false);
    }
  };

  const handleCreateChallenge = async () => {
    setChallengeLoading(true);
    try {
      await onCreateChallenge();
    } catch (err) {
      console.error(err);
      setChallengeLoading(false);
    }
  };

  const handleJoinChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim() || roomCode.length !== 6) {
      setJoinError("Enter a valid 6-character room code");
      return;
    }
    setJoining(true);
    setJoinError(null);
    try {
      const upperCode = roomCode.trim().toUpperCase();
      router.push(`/challenge/${upperCode}`);
    } catch (err: any) {
      setJoinError(err.message || "Failed to join room");
      setJoining(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 border-b border-blue-900 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold tracking-tight">GetPrime</span>
          <span className="hidden sm:inline-block text-xs bg-blue-800 text-blue-200 px-2 py-0.5 rounded font-medium border border-blue-700">
            TCS NQT Simulator
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-semibold">{profile.displayName}</span>
            <span className="text-xs text-blue-300">{profile.college} ({profile.graduationYear})</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await logout();
              router.push("/auth/login");
            }}
            className="text-blue-200 hover:text-white hover:bg-blue-800 border border-blue-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Hello {profile.displayName.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-600 max-w-2xl text-sm italic border-l-2 border-primary pl-3 py-1">
            &ldquo;{randomQuote}&rdquo;
          </p>
        </div>

        {/* Start Test Hero Card */}
        <Card className="border-border shadow-sm bg-white overflow-hidden border-t-4 border-t-primary">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            <div className="bg-blue-50 p-4 rounded-full border border-blue-100">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2 max-w-md">
              <h2 className="text-2xl font-bold text-slate-900">National Qualifier Mock Test</h2>
              <p className="text-sm text-slate-500">
                A full-length 90-minute examination simulation. The paper is generated with balanced questions across Numerical, Logical, and Verbal Ability.
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleStartPracticeTest}
              disabled={testLoading}
              className="h-14 px-8 text-lg font-semibold flex items-center justify-center gap-3 w-full max-w-xs shadow-md"
            >
              {testLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  START TEST
                </>
              )}
            </Button>
            <div className="text-xs text-slate-400">
              No negative marking. Timer starts immediately upon paper generation.
            </div>
          </CardContent>
        </Card>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Challenge Friends Mode */}
          <Card className="border-border shadow-sm bg-white flex flex-col">
            <CardHeader className="border-b border-border">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-bold text-slate-900">Challenge Friends</CardTitle>
              </div>
              <CardDescription>
                Create a lobby, share the room code, and compete on the exact same exam paper.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={handleCreateChallenge}
                  disabled={challengeLoading}
                  className="w-full h-12 font-semibold hover:bg-slate-50 flex items-center justify-center gap-2 border-dashed border-2 border-slate-300"
                >
                  {challengeLoading ? (
                    <span className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Users className="w-5 h-5 text-slate-600" />
                      Create New Challenge Lobby
                    </>
                  )}
                </Button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-widest bg-white">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <form onSubmit={handleJoinChallenge} className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      placeholder="Enter 6-digit code (e.g. AB12XY)"
                      maxLength={6}
                      className="h-11 font-mono uppercase text-center text-lg tracking-widest border-slate-300"
                      disabled={joining}
                      required
                    />
                    <Button type="submit" disabled={joining} className="px-6 h-11 font-semibold">
                      Join Room
                    </Button>
                  </div>
                  {joinError && (
                    <div className="text-xs text-red-600 font-semibold">{joinError}</div>
                  )}
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="border-border shadow-sm bg-white flex flex-col">
            <CardHeader className="border-b border-border flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <CardTitle className="text-lg font-bold text-slate-900">Leaderboard</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/leaderboard")}
                className="text-primary hover:bg-blue-50 font-semibold border border-transparent"
              >
                View Full
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <div className="divide-y divide-slate-100">
                {leaderboardPreview.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    No test attempts recorded yet. Be the first!
                  </div>
                ) : (
                  leaderboardPreview.map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between p-4 hover:bg-slate-50/50">
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          entry.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                          entry.rank === 2 ? "bg-slate-100 text-slate-600" :
                          entry.rank === 3 ? "bg-amber-100 text-amber-700" : "text-slate-500"
                        }`}>
                          {entry.rank}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">{entry.name}</span>
                          <span className="text-xs text-slate-400">{entry.college}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-900">{entry.score.toFixed(1)} pts</div>
                        <div className="text-xs text-slate-400">{entry.time} | {entry.accuracy.toFixed(0)}% acc</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
