import { prisma } from "@/lib/prisma";
import { Question } from "@prisma/client";

interface SectionSettings {
  count: number;
  easy: number;
  medium: number;
  hard: number;
  positiveScore: number;
  negativeScore: number;
}

interface ExamConfigJson {
  [sectionName: string]: SectionSettings;
}

/**
 * Shuffles an array in place using Durstenfeld shuffle.
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a balanced set of question IDs based on exam configuration
 * @param configId The ExamConfiguration ID to load settings from
 * @returns Array of Question objects in the locked presentation order
 */
export async function generatePaper(configId: string): Promise<Question[]> {
  const config = await prisma.examConfiguration.findUnique({
    where: { id: configId },
  });

  if (!config) {
    throw new Error(`Exam configuration ${configId} not found`);
  }

  const sectionOrder = config.sectionOrder as string[];
  const sectionConfig = config.sectionConfig as unknown as ExamConfigJson;

  let finalPaperQuestions: Question[] = [];

  // Grouped by section order
  for (const section of sectionOrder) {
    const settings = sectionConfig[section];
    if (!settings) continue;

    // Fetch all questions for this section
    const allSectionQuestions = await prisma.question.findMany({
      where: { section },
    });

    if (allSectionQuestions.length === 0) {
      throw new Error(`No questions found for section ${section} in database`);
    }

    let selectedForSection: Question[] = [];

    // Helper to draw random elements from a pool
    const drawQuestions = (pool: Question[], count: number) => {
      const shuffledPool = shuffleArray(pool);
      return shuffledPool.slice(0, count);
    };

    if (section === "VERBAL") {
      // STRICT VERBAL SELECTION: 20 Sentence Completions, 4 Passage Recalls, 1 Email Writing
      const sentenceCompletionQs = allSectionQuestions.filter((q) => q.topic === "Sentence Completion");
      const passageRecallQs = allSectionQuestions.filter((q) => q.topic === "Passage Recall");
      const emailWritingQs = allSectionQuestions.filter((q) => q.topic === "Email Writing");

      const drawnSentence = drawQuestions(sentenceCompletionQs, 20);
      const drawnPassage = drawQuestions(passageRecallQs, 4);
      const drawnEmail = drawQuestions(emailWritingQs, 1);

      selectedForSection.push(...drawnSentence, ...drawnPassage, ...drawnEmail);
    } else {
      const easyQs = allSectionQuestions.filter((q) => q.difficulty === "EASY");
      const mediumQs = allSectionQuestions.filter((q) => q.difficulty === "MEDIUM");
      const hardQs = allSectionQuestions.filter((q) => q.difficulty === "HARD");

      const selectedEasy = drawQuestions(easyQs, settings.easy);
      const selectedMedium = drawQuestions(mediumQs, settings.medium);
      const selectedHard = drawQuestions(hardQs, settings.hard);

      selectedForSection.push(...selectedEasy, ...selectedMedium, ...selectedHard);

      // Fallback: If we couldn't get enough questions of specific difficulties, draw from the general section pool
      if (selectedForSection.length < settings.count) {
        const currentIds = new Set(selectedForSection.map((q) => q.id));
        const remainingPool = allSectionQuestions.filter((q) => !currentIds.has(q.id));
        const needed = settings.count - selectedForSection.length;
        selectedForSection.push(...drawQuestions(remainingPool, needed));
      }
    }

    // Shuffle the questions within this section (so they are not ordered by easy->medium->hard)
    const shuffledSection = shuffleArray(selectedForSection);
    finalPaperQuestions.push(...shuffledSection);
  }

  return finalPaperQuestions;
}
