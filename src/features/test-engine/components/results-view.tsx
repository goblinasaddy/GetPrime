"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle2, XCircle, Clock, Percent, Award, ArrowLeft, BookOpen, ChevronsUpDown } from "lucide-react";

interface SectionAnalysis {
  section: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  accuracy: number;
}

interface QuestionReviewData {
  id: string;
  section: string;
  topic: string;
  difficulty: string;
  questionText: string;
  options: string[];
  correctOption: string;
  explanation: string | null;
  selectedOption: string | null;
  isCorrect: boolean;
  evaluation?: {
    score: number;
    feedback: string;
    grammar: number;
    coverage: number;
    compliance: number;
    evaluator?: string;
  } | null;
}

interface ResultsViewProps {
  score: number;
  accuracy: number;
  timeTaken: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  sectionScores: SectionAnalysis[];
  strongTopics: string[];
  weakTopics: string[];
  reviews: QuestionReviewData[];
}

export function ResultsView({
  score,
  accuracy,
  timeTaken,
  totalQuestions,
  attempted,
  correct,
  incorrect,
  sectionScores,
  strongTopics,
  weakTopics,
  reviews,
}: ResultsViewProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  // Prepare chart data
  const chartData = sectionScores.map((sec) => ({
    name: sec.section.replace("_", " "),
    Accuracy: parseFloat(sec.accuracy.toFixed(1)),
    Score: sec.score,
  }));

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 border-b border-blue-900 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold tracking-tight">GetPrime</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="text-blue-200 hover:text-white hover:bg-blue-800 border border-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Test Results</h1>
          <p className="text-slate-500 text-sm">Performance summary and analytical breakdown of your mock test.</p>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border-border shadow-xs p-6 flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full border border-blue-100">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Score</span>
              <span className="text-2xl font-bold text-slate-800">{score.toFixed(1)}</span>
              <span className="text-xs text-slate-400 block">out of {totalQuestions}</span>
            </div>
          </Card>

          <Card className="bg-white border-border shadow-xs p-6 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full border border-green-100">
              <Percent className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Accuracy</span>
              <span className="text-2xl font-bold text-slate-800">{accuracy.toFixed(1)}%</span>
              <span className="text-xs text-slate-400 block">{correct} correct of {attempted}</span>
            </div>
          </Card>

          <Card className="bg-white border-border shadow-xs p-6 flex items-center space-x-4">
            <div className="bg-orange-50 p-3 rounded-full border border-orange-100">
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Time Taken</span>
              <span className="text-2xl font-bold text-slate-800">{formatTime(timeTaken)}</span>
              <span className="text-xs text-slate-400 block">elapsed time</span>
            </div>
          </Card>

          <Card className="bg-white border-border shadow-xs p-6 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full border border-purple-100">
              <CheckCircle2 className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Attempt Rate</span>
              <span className="text-2xl font-bold text-slate-800">
                {((attempted / totalQuestions) * 100).toFixed(0)}%
              </span>
              <span className="text-xs text-slate-400 block">{attempted} attempted of {totalQuestions}</span>
            </div>
          </Card>
        </div>

        {/* Section breakdown & chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section Table */}
          <Card className="lg:col-span-2 bg-white border-border shadow-xs overflow-hidden flex flex-col">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-bold text-slate-900">Section Performance</CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border text-slate-500 font-semibold">
                    <th className="p-4">Section Name</th>
                    <th className="p-4 text-center">Questions</th>
                    <th className="p-4 text-center">Attempted</th>
                    <th className="p-4 text-center">Correct</th>
                    <th className="p-4 text-center">Score</th>
                    <th className="p-4 text-right">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sectionScores.map((sec) => (
                    <tr key={sec.section} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-slate-800">{sec.section.replace("_", " ")} Ability</td>
                      <td className="p-4 text-center text-slate-600">{sec.totalQuestions}</td>
                      <td className="p-4 text-center text-slate-600">{sec.attempted}</td>
                      <td className="p-4 text-center text-green-600 font-semibold">{sec.correct}</td>
                      <td className="p-4 text-center font-bold text-slate-800">{sec.score.toFixed(1)}</td>
                      <td className="p-4 text-right text-slate-900 font-semibold">{sec.accuracy.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recharts Graphical Analysis */}
          <Card className="bg-white border-border shadow-xs flex flex-col justify-between">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-bold text-slate-900">Accuracy Chart</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex items-center justify-center min-h-[220px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="Accuracy" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="Accuracy (%)" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-slate-400 text-sm">Loading Chart...</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white border-border shadow-xs border-t-4 border-t-green-500">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-bold text-green-700 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Strong Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {strongTopics.length === 0 ? (
                <p className="text-slate-400 text-sm italic">Keep practicing to build strong areas!</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {strongTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-semibold"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-border shadow-xs border-t-4 border-t-red-500">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-bold text-red-700 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Needs Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {weakTopics.length === 0 ? (
                <p className="text-slate-400 text-sm italic">Great job! No weak topics detected.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {weakTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-semibold"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Question Review Section */}
        <Card className="bg-white border-border shadow-xs">
          <CardHeader className="border-b border-border">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-bold text-slate-900">Question Review</CardTitle>
            </div>
            <CardDescription>Click a question below to see the details, your answer, and the explanation.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100">
            {reviews.map((rev, idx) => {
              const isActive = activeReviewIdx === idx;
              return (
                <div key={rev.id} className="flex flex-col">
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setActiveReviewIdx(isActive ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 mr-4">
                      {rev.selectedOption === null ? (
                        <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                          -
                        </span>
                      ) : rev.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-slate-700 line-clamp-1">
                          Q{idx + 1}. {rev.questionText}
                        </span>
                        <div className="flex space-x-2 mt-1">
                          <span className="text-xxs uppercase tracking-wider font-bold text-slate-400">
                            {rev.section.replace("_", " ")}
                          </span>
                          <span className="text-xxs font-bold text-slate-400">•</span>
                          <span className="text-xxs font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {rev.topic}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>

                  {/* Accordion Content */}
                  {isActive && (
                    <div className="bg-slate-50/50 p-6 border-t border-slate-100 space-y-4">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500">Question:</span>
                        <p className="text-sm font-medium text-slate-800 whitespace-pre-line">{rev.questionText}</p>
                      </div>

                      {/* Options or Text response */}
                      {rev.options && rev.options.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {rev.options.map((opt, optIdx) => {
                            const isSelected = rev.selectedOption === opt;
                            const isCorrect = rev.correctOption === opt;
                            
                            let cardStyle = "border-slate-200 bg-white";
                            if (isCorrect) {
                              cardStyle = "border-green-300 bg-green-50/30 text-green-800 ring-1 ring-green-500";
                            } else if (isSelected && !isCorrect) {
                              cardStyle = "border-red-300 bg-red-50/30 text-red-800 ring-1 ring-red-500";
                            }

                            return (
                              <div key={optIdx} className={`p-3 text-xs border rounded flex items-center space-x-2 font-medium ${cardStyle}`}>
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xxs ${
                                  isCorrect ? "bg-green-600 text-white" :
                                  isSelected ? "bg-red-600 text-white" : "bg-slate-100 border border-slate-300 text-slate-500"
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-4 pt-2">
                          {/* User answer and Correct Answer display */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`p-4 border rounded space-y-1 ${
                              rev.isCorrect ? "border-green-200 bg-green-50/10" : "border-red-200 bg-red-50/10"
                            }`}>
                              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider block">Your Response:</span>
                              <p className="text-xs font-semibold text-slate-800 whitespace-pre-line leading-relaxed">
                                {rev.selectedOption || "[No response submitted]"}
                              </p>
                            </div>
                            <div className="p-4 border border-green-200 bg-green-50/10 rounded space-y-1">
                              <span className="text-xxs font-bold text-green-700 uppercase tracking-wider block">Correct / Model Answer:</span>
                              <p className="text-xs font-semibold text-green-800 whitespace-pre-line leading-relaxed">
                                {rev.correctOption}
                              </p>
                            </div>
                          </div>

                          {/* AI Evaluation feedback (if present) */}
                          {rev.evaluation && (
                            <div className={`p-5 border rounded-lg space-y-3 ${
                              rev.evaluation.evaluator === "api_failure"
                                ? "bg-amber-50/40 border-amber-200"
                                : "bg-blue-50/30 border-blue-200"
                            }`}>
                              <div className="flex flex-wrap justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-bold uppercase tracking-wider ${
                                    rev.evaluation.evaluator === "api_failure" ? "text-amber-700" : "text-primary"
                                  }`}>
                                    {rev.evaluation.evaluator === "api_failure"
                                      ? "⚠ Grading Skipped (API Unavailable)"
                                      : "AI Grading Report (TCS NQT Simulation)"}
                                  </span>
                                  {/* Provider badge */}
                                  {rev.evaluation.evaluator && rev.evaluation.evaluator !== "api_failure" && (
                                    <span className={`px-2 py-0.5 rounded-full text-xxs font-bold uppercase ${
                                      rev.evaluation.evaluator === "groq"
                                        ? "bg-violet-100 text-violet-700"
                                        : rev.evaluation.evaluator === "gemini"
                                        ? "bg-teal-100 text-teal-700"
                                        : "bg-slate-100 text-slate-600"
                                    }`}>
                                      {rev.evaluation.evaluator === "groq" ? "Groq" :
                                       rev.evaluation.evaluator === "gemini" ? "Gemini" :
                                       "Heuristic"}
                                    </span>
                                  )}
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  rev.evaluation.evaluator === "api_failure"
                                    ? "bg-amber-100 text-amber-800"
                                    : rev.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}>
                                  {rev.evaluation.evaluator === "api_failure"
                                    ? "Auto-Passed"
                                    : `Score: ${Math.round(rev.evaluation.score * 10)}/10`}
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                <span className="font-bold text-slate-700 block mb-1">Feedback:</span>
                                {rev.evaluation.feedback}
                              </p>

                              {rev.evaluation.evaluator !== "api_failure" && (
                                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-blue-100/50">
                                  <div className="text-center">
                                    <span className="text-xxs font-bold text-slate-400 uppercase block">Grammar</span>
                                    <span className="text-sm font-bold text-slate-700">{rev.evaluation.grammar}%</span>
                                  </div>
                                  <div className="text-center">
                                    <span className="text-xxs font-bold text-slate-400 uppercase block">Coverage</span>
                                    <span className="text-sm font-bold text-slate-700">{rev.evaluation.coverage}%</span>
                                  </div>
                                  <div className="text-center">
                                    <span className="text-xxs font-bold text-slate-400 uppercase block">Compliance</span>
                                    <span className="text-sm font-bold text-slate-700">{rev.evaluation.compliance}%</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Explanation */}
                      {rev.explanation && (
                        <div className="mt-4 p-4 bg-white border border-slate-200 rounded space-y-2">
                          <span className="text-xs font-bold text-slate-700 block">Step-by-step Solution:</span>
                          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{rev.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
