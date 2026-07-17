"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PaletteBubble, QuestionStatus } from "@/components/ui/palette-bubble";
import { saveAnswers, submitSession } from "../actions";
import { Clock, AlertTriangle, ArrowLeft, ArrowRight, CheckSquare } from "lucide-react";

interface Question {
  id: string;
  section: string;
  topic: string;
  difficulty: string;
  questionText: string;
  options: string[];
}

interface AnswersMap {
  [questionId: string]: {
    selectedOption: string | null;
    flagged: boolean;
    visited: boolean;
  };
}

interface SectionMetadata {
  activeSection: string;
  sectionTimesLeft: { [section: string]: number }; // in seconds
  lastUpdated: number; // timestamp in ms
}

interface TestContainerProps {
  sessionId: string;
  initialAnswers: AnswersMap;
  questions: Question[];
  durationMinutes: number;
  startedAt: string;
  sectionOrder: string[];
}

function adjustSectionMetadataForElapsedTime(
  metadata: SectionMetadata,
  sectionOrder: string[]
): SectionMetadata {
  const elapsedMs = Date.now() - metadata.lastUpdated;
  let elapsedSecs = Math.max(0, Math.floor(elapsedMs / 1000));

  if (elapsedSecs <= 0) {
    return { ...metadata, lastUpdated: Date.now() };
  }

  const updatedTimes = { ...metadata.sectionTimesLeft };
  let currentSection = metadata.activeSection;

  let activeIdx = sectionOrder.indexOf(currentSection);
  if (activeIdx === -1) activeIdx = 0;

  for (let i = activeIdx; i < sectionOrder.length; i++) {
    const sec = sectionOrder[i];
    const timeLeft = updatedTimes[sec] || 0;

    if (timeLeft <= 0) continue;

    if (elapsedSecs >= timeLeft) {
      updatedTimes[sec] = 0;
      elapsedSecs -= timeLeft;
      if (i === sectionOrder.length - 1) {
        currentSection = sec;
        break;
      } else {
        currentSection = sectionOrder[i + 1];
      }
    } else {
      updatedTimes[sec] = timeLeft - elapsedSecs;
      currentSection = sec;
      elapsedSecs = 0;
      break;
    }
  }

  return {
    activeSection: currentSection,
    sectionTimesLeft: updatedTimes,
    lastUpdated: Date.now(),
  };
}

export function TestContainer({
  sessionId,
  initialAnswers,
  questions,
  durationMinutes,
  startedAt,
  sectionOrder,
}: TestContainerProps) {
  const router = useRouter();

  // 1. Initialize Section Timed Metadata
  const initMetadata = (): SectionMetadata => {
    const SECTION_DURATIONS: { [key: string]: number } = {
      NUMERICAL: 25 * 60, // 25 minutes
      LOGICAL: 25 * 60,   // 25 minutes
      ADVANCED: 25 * 60,  // 25 minutes
      VERBAL: 26 * 60,    // 26 minutes
    };
    const baseTimePerSection = Math.floor(durationMinutes / sectionOrder.length) * 60;
    const sectionTimesLeft: { [sec: string]: number } = {};
    sectionOrder.forEach((sec) => {
      sectionTimesLeft[sec] = SECTION_DURATIONS[sec] || baseTimePerSection;
    });

    return {
      activeSection: sectionOrder[0],
      sectionTimesLeft,
      lastUpdated: Date.now(),
    };
  };

  const [metadata, setMetadata] = useState<SectionMetadata>(() => {
    const meta = (initialAnswers as any)._metadata;
    if (meta) {
      return adjustSectionMetadataForElapsedTime(meta, sectionOrder);
    }
    return initMetadata();
  });

  const activeSection = metadata.activeSection;
  const activeSecTimeLeft = metadata.sectionTimesLeft[activeSection] || 0;

  // 2. Answers State
  const [answers, setAnswers] = useState<AnswersMap>(() => {
    const state = { ...initialAnswers };
    // Remove metadata key if it's there
    delete (state as any)._metadata;

    // Initialize first question in active section as visited
    const activeQuestions = questions.filter((q) => q.section === activeSection);
    if (activeQuestions.length > 0) {
      const firstId = activeQuestions[0].id;
      state[firstId] = {
        selectedOption: state[firstId]?.selectedOption || null,
        flagged: state[firstId]?.flagged || false,
        visited: true,
      };
    }
    return state;
  });

  // Keep answers state matching the current question list index
  const sectionQuestions = questions.filter((q) => q.section === activeSection);
  const [currentIdx, setCurrentIdx] = useState(() => {
    const activeQ = questions.filter((q) => q.section === activeSection);
    if (activeQ.length > 0) {
      return questions.findIndex((q) => q.id === activeQ[0].id);
    }
    return 0;
  });

  const currentQuestion = questions[currentIdx];
  const currentSectionIdx = sectionQuestions.findIndex((q) => q.id === currentQuestion?.id);

  const [saving, setSaving] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showSubmitSectionConfirm, setShowSubmitSectionConfirm] = useState(false);

  // Passage Recall specific states
  const [passageReadTimeLeft, setPassageReadTimeLeft] = useState(30);
  const [passageHidden, setPassageHidden] = useState(false);

  useEffect(() => {
    if (currentQuestion?.topic === "Passage Recall") {
      const hasExistingAnswer = !!answers[currentQuestion.id]?.selectedOption;
      setPassageReadTimeLeft(hasExistingAnswer ? 0 : 30);
      setPassageHidden(hasExistingAnswer);

      if (!hasExistingAnswer) {
        const passageTimer = setInterval(() => {
          setPassageReadTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(passageTimer);
              setPassageHidden(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(passageTimer);
      }
    }
  }, [currentQuestion?.id]);

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const metadataRef = useRef(metadata);
  metadataRef.current = metadata;

  // 3. Keep answers._metadata in sync with metadata state
  useEffect(() => {
    setAnswers((prev) => ({
      ...prev,
      _metadata: metadata as any,
    }));
  }, [metadata]);

  // 4. Timer Countdown loop
  useEffect(() => {
    const timer = setInterval(() => {
      setMetadata((prev) => {
        const activeSec = prev.activeSection;
        const currentSecsLeft = prev.sectionTimesLeft[activeSec] || 0;

        if (currentSecsLeft <= 0) {
          clearInterval(timer);
          return prev;
        }

        const updatedTimes = {
          ...prev.sectionTimesLeft,
          [activeSec]: currentSecsLeft - 1,
        };

        if (currentSecsLeft - 1 <= 0) {
          // Transition to next section if time runs out
          const nextIdx = sectionOrder.indexOf(activeSec) + 1;
          if (nextIdx < sectionOrder.length) {
            return {
              activeSection: sectionOrder[nextIdx],
              sectionTimesLeft: {
                ...updatedTimes,
                [activeSec]: 0,
              },
              lastUpdated: Date.now(),
            };
          }
        }

        return {
          ...prev,
          sectionTimesLeft: updatedTimes,
          lastUpdated: Date.now(),
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSection, sectionOrder]);

  // 5. Automatic transition when section changes
  useEffect(() => {
    const activeQ = questions.filter((q) => q.section === activeSection);
    if (activeQ.length > 0) {
      const targetGlobalIdx = questions.findIndex((q) => q.id === activeQ[0].id);
      setCurrentIdx(targetGlobalIdx);
      setAnswers((prev) => {
        const updated = { ...prev };
        updated[activeQ[0].id] = {
          selectedOption: prev[activeQ[0].id]?.selectedOption || null,
          flagged: prev[activeQ[0].id]?.flagged || false,
          visited: true,
        };
        return updated;
      });
    }
  }, [activeSection, questions]);

  // 6. Check for ultimate test expiration when active section ends
  useEffect(() => {
    if (activeSecTimeLeft <= 0) {
      const activeIdx = sectionOrder.indexOf(activeSection);
      if (activeIdx === sectionOrder.length - 1) {
        handleAutoSubmit();
      }
    }
  }, [activeSecTimeLeft, activeSection, sectionOrder]);

  // 7. Auto-Save periodically every 15 seconds
  useEffect(() => {
    const saveState = async () => {
      try {
        const timeTaken = durationMinutes * 60 - Object.values(metadataRef.current.sectionTimesLeft).reduce((a, b) => a + b, 0);
        const payload = {
          ...answersRef.current,
          _metadata: metadataRef.current,
        };
        await saveAnswers(sessionId, payload, timeTaken);
      } catch (err) {
        console.error("Auto-save failed:", err);
      }
    };

    const interval = setInterval(saveState, 15000);
    return () => clearInterval(interval);
  }, [sessionId, durationMinutes]);

  const handleAutoSubmit = async () => {
    try {
      const timeTaken = durationMinutes * 60;
      const payload = {
        ...answersRef.current,
        _metadata: metadataRef.current,
      };
      await submitSession(sessionId, payload, timeTaken);
      router.push(`/test/results/${sessionId}`);
    } catch (err) {
      console.error("Auto-submit failed:", err);
    }
  };

  const handleManualSubmit = async () => {
    setSaving(true);
    try {
      const timeTaken = durationMinutes * 60 - Object.values(metadata.sectionTimesLeft).reduce((a, b) => a + b, 0);
      const payload = {
        ...answers,
        _metadata: metadata,
      };
      await submitSession(sessionId, payload, timeTaken);
      router.push(`/test/results/${sessionId}`);
    } catch (err) {
      console.error("Submission failed:", err);
      setSaving(false);
    }
  };

  const handleSaveSectionAndProceed = async () => {
    setShowSubmitSectionConfirm(false);
    const currentSecIdx = sectionOrder.indexOf(activeSection);
    if (currentSecIdx < sectionOrder.length - 1) {
      const nextSec = sectionOrder[currentSecIdx + 1];
      
      setMetadata((prev) => {
        const updatedTimes = { ...prev.sectionTimesLeft };
        
        return {
          activeSection: nextSec,
          sectionTimesLeft: updatedTimes,
          lastUpdated: Date.now(),
        };
      });

      const timeTaken = durationMinutes * 60 - Object.values(metadata.sectionTimesLeft).reduce((a, b) => a + b, 0);
      const payload = {
        ...answers,
        _metadata: {
          activeSection: nextSec,
          sectionTimesLeft: {
            ...metadata.sectionTimesLeft,
          },
          lastUpdated: Date.now(),
        },
      };
      saveAnswers(sessionId, payload, timeTaken).catch(console.error);
    }
  };

  const goToQuestion = (globalIdx: number) => {
    if (globalIdx < 0 || globalIdx >= questions.length) return;
    const targetQ = questions[globalIdx];
    if (targetQ.section !== activeSection) return; // Locked: cannot navigate outside active section

    setAnswers((prev) => {
      const updated = { ...prev };
      updated[targetQ.id] = {
        selectedOption: prev[targetQ.id]?.selectedOption || null,
        flagged: prev[targetQ.id]?.flagged || false,
        visited: true,
      };
      return updated;
    });

    setCurrentIdx(globalIdx);
  };

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => {
      const qState = prev[currentQuestion.id] || { flagged: false, visited: true };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...qState,
          selectedOption: option,
          visited: true,
        },
      };
    });
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const qState = prev[currentQuestion.id] || { flagged: false, visited: true };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...qState,
          selectedOption: null,
        },
      };
    });
  };

  const handleSaveNext = () => {
    if (currentSectionIdx === sectionQuestions.length - 1) {
      // Last question of this section: submit section or submit exam
      const isLastSection = sectionOrder.indexOf(activeSection) === sectionOrder.length - 1;
      if (isLastSection) {
        setShowSubmitConfirm(true);
      } else {
        setShowSubmitSectionConfirm(true);
      }
    } else {
      goToQuestion(currentIdx + 1);
    }
  };

  const handleMarkReviewNext = () => {
    setAnswers((prev) => {
      const qState = prev[currentQuestion.id] || { selectedOption: null, visited: true };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...qState,
          flagged: true,
        },
      };
    });

    if (currentSectionIdx === sectionQuestions.length - 1) {
      const isLastSection = sectionOrder.indexOf(activeSection) === sectionOrder.length - 1;
      if (isLastSection) {
        setShowSubmitConfirm(true);
      } else {
        setShowSubmitSectionConfirm(true);
      }
    } else {
      goToQuestion(currentIdx + 1);
    }
  };

  const getQuestionStatus = (qId: string): QuestionStatus => {
    const state = answers[qId];
    if (!state || !state.visited) return "unvisited";

    const hasAnswer = state.selectedOption !== null && state.selectedOption !== undefined && state.selectedOption !== "";
    const isFlagged = state.flagged;

    if (isFlagged) {
      return hasAnswer ? "answered-review" : "review";
    }
    return hasAnswer ? "answered" : "unanswered";
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-100 select-none">
      {/* Top Header Panel */}
      <header className="bg-primary text-primary-foreground h-14 min-h-14 px-6 border-b border-blue-900 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-bold tracking-tight">TCS NQT Mock Exam</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-blue-950 px-3 py-1.5 rounded border border-blue-800 text-sm font-semibold">
            <Clock className="w-4 h-4 text-blue-300" />
            <span>Time Left in Section: {formatTime(activeSecTimeLeft)}</span>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowSubmitConfirm(true)}
            className="font-bold border border-red-700"
          >
            Submit Test
          </Button>
        </div>
      </header>

      {/* Section Tabs Panel */}
      <div className="bg-white border-b border-border h-12 min-h-12 flex items-center px-6 justify-between shadow-xs">
        <div className="flex space-x-1">
          {sectionOrder.map((section) => {
            const isCurrent = activeSection === section;
            return (
              <button
                key={section}
                disabled={!isCurrent}
                className={`px-4 h-12 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  isCurrent
                    ? "border-b-primary text-primary bg-blue-50/30 cursor-default"
                    : "border-b-transparent text-slate-300 cursor-not-allowed bg-slate-50/10"
                }`}
              >
                {section.replace("_", " ")} Ability
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Question Pane */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white p-6 justify-between border-r border-border">
          {/* Question Top Metadata */}
          <div className="border-b border-border pb-3 mb-4 flex justify-between items-center text-sm">
            <span className="font-bold text-slate-800">
              Section: {activeSection.replace("_", " ")} Ability
            </span>
            <span className="text-slate-500 font-semibold">
              Question No. {currentSectionIdx + 1} of {sectionQuestions.length}
            </span>
          </div>

          {/* Question Text & Options Container */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            <div className="space-y-4">
              {/* Question Text / Passage Recall conditional rendering */}
              {currentQuestion?.topic === "Passage Recall" ? (
                <div className="space-y-4">
                  {!passageHidden ? (
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg flex items-center justify-between animate-pulse">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span className="font-semibold text-sm">Reading Time: {passageReadTimeLeft}s remaining</span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setPassageHidden(true)}
                          className="h-8 font-semibold text-xs"
                        >
                          Start Writing (Hide Passage)
                        </Button>
                      </div>
                      <p className="text-base text-slate-900 font-medium leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-lg border border-slate-100">
                        {currentQuestion.questionText}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 text-slate-600 p-4 rounded-lg flex items-center space-x-2">
                      <CheckSquare className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-sm">Passage hidden. Reconstruct the passage in the text area below.</span>
                    </div>
                  )}
                </div>
              ) : currentQuestion?.topic === "Email Writing" ? (
                <div className="bg-blue-50/40 border border-blue-100 p-5 rounded-lg space-y-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block">Email Writing Prompt</span>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                    {currentQuestion.questionText}
                  </p>
                </div>
              ) : (
                <p className="text-base text-slate-900 font-medium leading-relaxed whitespace-pre-line">
                  {currentQuestion?.questionText}
                </p>
              )}
            </div>

            {/* Answer Options / Text Input area */}
            {currentQuestion?.options && currentQuestion.options.length > 0 ? (
              <div className="space-y-3 pt-4 max-w-2xl">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentQuestion.id]?.selectedOption === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full flex items-start gap-4 p-4 text-left border rounded transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-blue-50/50 text-slate-900 ring-1 ring-primary"
                          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className={`w-5 h-5 min-w-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                        isSelected ? "border-primary bg-primary text-white" : "border-slate-300"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-medium">{option}</span>
                    </button>
                  );
                })}
              </div>
            ) : currentQuestion?.topic === "Email Writing" || currentQuestion?.topic === "Passage Recall" ? (
              <div className="space-y-3 pt-4 max-w-3xl">
                {currentQuestion.topic === "Passage Recall" && !passageHidden ? (
                  <div className="p-8 border border-dashed border-slate-200 rounded-lg text-center text-slate-400 font-medium text-sm">
                    Reconstruction text box will appear after the reading timer expires or you click "Start Writing".
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Type Your Response Below:
                    </label>
                    <textarea
                      value={answers[currentQuestion.id]?.selectedOption || ""}
                      onChange={(e) => handleSelectOption(e.target.value)}
                      placeholder={
                        currentQuestion.topic === "Email Writing"
                          ? "Subject: ...\n\nDear ...,\n\n..."
                          : "Type your reconstructed passage here..."
                      }
                      rows={12}
                      className="w-full p-4 border border-slate-300 rounded-lg shadow-inner focus:ring-2 focus:ring-primary focus:outline-none font-sans text-sm leading-relaxed"
                    />
                    <div className="flex justify-between items-center text-xs text-slate-500 font-semibold pt-1">
                      <span>
                        {currentQuestion.topic === "Email Writing" ? "Recommended Length: 100-150 words" : ""}
                      </span>
                      <span>
                        Word Count: {(answers[currentQuestion.id]?.selectedOption || "").trim().split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2 pt-4 max-w-lg">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Your Answer:
                </label>
                <input
                  type="text"
                  value={answers[currentQuestion?.id]?.selectedOption || ""}
                  onChange={(e) => handleSelectOption(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-3 border border-slate-300 rounded-lg shadow-inner focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
                />
              </div>
            )}
          </div>

          {/* Question Bottom Action Toolbar */}
          <div className="border-t border-border pt-4 mt-4 flex justify-between items-center bg-white">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkReviewNext}
                className="font-semibold text-xs h-10 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Mark for Review & Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearResponse}
                className="font-semibold text-xs h-10 border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Clear Response
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToQuestion(currentIdx - 1)}
                disabled={currentSectionIdx === 0}
                className="font-semibold text-xs h-10 flex items-center gap-1 border-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveNext}
                className="font-semibold text-xs h-10 flex items-center gap-1"
              >
                {currentSectionIdx === sectionQuestions.length - 1 ? (
                  sectionOrder.indexOf(activeSection) === sectionOrder.length - 1 ? (
                    "Submit Exam"
                  ) : (
                    "Submit Section"
                  )
                ) : (
                  "Save & Next"
                )}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Palette Pane */}
        <div className="w-72 min-w-72 bg-slate-50 flex flex-col justify-between p-4 overflow-y-auto">
          {/* Candidate Profile Details */}
          <div className="bg-white border border-border p-4 rounded mb-4 flex items-center space-x-3 shadow-xs">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
              S
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Candidate</span>
              <span className="text-sm font-semibold text-slate-500 truncate">Mock Student</span>
            </div>
          </div>

          {/* Sectional Question Palette */}
          <div className="flex-1 flex flex-col min-h-0 bg-white border border-border p-4 rounded shadow-xs mb-4">
            <span className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wider">
              Question Palette ({activeSection.replace("_", " ")})
            </span>
            {/* Grid of Palette Bubbles */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="grid grid-cols-5 gap-2 pr-1">
                {sectionQuestions.map((q, idx) => (
                  <PaletteBubble
                    key={q.id}
                    number={idx + 1}
                    status={getQuestionStatus(q.id)}
                    isActive={q.id === currentQuestion?.id}
                    onClick={() => goToQuestion(questions.findIndex((allQ) => allQ.id === q.id))}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Legends and Instructions */}
          <div className="bg-white border border-border p-4 rounded text-xs space-y-2 shadow-xs mb-4">
            <span className="font-bold text-slate-600 uppercase tracking-wider block mb-1">Legend</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-4 h-4 bg-palette-unvisited border border-slate-300 rounded" />
                <span className="text-slate-500 font-medium">Not Visited</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-4 h-4 bg-palette-unanswered border border-orange-700 rounded-t" />
                <span className="text-slate-500 font-medium">Not Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-4 h-4 bg-palette-answered border border-green-700 rounded-b" />
                <span className="text-slate-500 font-medium">Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-4 h-4 bg-palette-review border border-purple-700 rounded-full" />
                <span className="text-slate-500 font-medium">Marked Review</span>
              </div>
              <div className="flex items-center space-x-1.5 col-span-2">
                <span className="w-4 h-4 bg-palette-answered-review border border-blue-700 rounded-full relative">
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full border border-white" />
                </span>
                <span className="text-slate-500 font-medium">Answered & Marked Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Submit Confirmation Dialog overlay */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border border-border shadow-xl p-6">
            <div className="flex items-center space-x-3 text-amber-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Submit Examination?</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to submit your exam? Once submitted, you cannot change your answers or resume the test.
            </p>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowSubmitConfirm(false)}
                disabled={saving}
                className="h-10 px-4 font-semibold text-xs"
              >
                Cancel and Continue
              </Button>
              <Button
                variant="danger"
                onClick={handleManualSubmit}
                disabled={saving}
                className="h-10 px-4 font-semibold text-xs flex items-center gap-1"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckSquare className="w-4 h-4" />
                    Confirm Submission
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Submit Section Confirmation Dialog overlay */}
      {showSubmitSectionConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border border-border shadow-xl p-6">
            <div className="flex items-center space-x-3 text-amber-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Submit Section?</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to submit the **{activeSection.replace("_", " ")} Ability** section? 
              Once submitted, you will immediately proceed to the next section and **cannot return** to review these questions.
            </p>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowSubmitSectionConfirm(false)}
                className="h-10 px-4 font-semibold text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveSectionAndProceed}
                className="h-10 px-4 font-semibold text-xs flex items-center gap-1"
              >
                Confirm & Next Section
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
