const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Exam Configuration
  const defaultConfig = await prisma.examConfiguration.upsert({
    where: { id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" },
    update: {
      duration: 101,
      sectionOrder: ["NUMERICAL", "LOGICAL", "ADVANCED", "VERBAL"],
      sectionConfig: {
        NUMERICAL: {
          count: 20,
          easy: 5,
          medium: 10,
          hard: 5,
          positiveScore: 1.0,
          negativeScore: 0.0
        },
        LOGICAL: {
          count: 20,
          easy: 5,
          medium: 10,
          hard: 5,
          positiveScore: 1.0,
          negativeScore: 0.0
        },
        ADVANCED: {
          count: 14,
          easy: 0,
          medium: 5,
          hard: 9,
          positiveScore: 2.0,
          negativeScore: 0.0
        },
        VERBAL: {
          count: 25,
          easy: 7,
          medium: 13,
          hard: 5,
          positiveScore: 1.0,
          negativeScore: 0.0
        }
      }
    },
    create: {
      id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      name: "TCS NQT National Qualifier Mock",
      duration: 101, // 101 minutes
      sectionOrder: ["NUMERICAL", "LOGICAL", "ADVANCED", "VERBAL"],
      sectionConfig: {
        NUMERICAL: {
          count: 20,
          easy: 5,
          medium: 10,
          hard: 5,
          positiveScore: 1.0,
          negativeScore: 0.0
        },
        LOGICAL: {
          count: 20,
          easy: 5,
          medium: 10,
          hard: 5,
          positiveScore: 1.0,
          negativeScore: 0.0
        },
        ADVANCED: {
          count: 14,
          easy: 0,
          medium: 5,
          hard: 9,
          positiveScore: 2.0,
          negativeScore: 0.0
        },
        VERBAL: {
          count: 25,
          easy: 7,
          medium: 13,
          hard: 5,
          positiveScore: 1.0,
          negativeScore: 0.0
        }
      },
      isDefault: true
    }
  });

  console.log("Seeded Exam Configuration: ", defaultConfig.name);

  // 2. Load Questions from database/questions.json
  const questionsPath = path.join(__dirname, "..", "database", "questions.json");
  console.log(`Reading questions from: ${questionsPath}`);
  
  if (!fs.existsSync(questionsPath)) {
    throw new Error(`Questions file not found at: ${questionsPath}`);
  }
  
  const rawData = fs.readFileSync(questionsPath, "utf-8");
  const rawQuestions = JSON.parse(rawData);
  console.log(`Loaded ${rawQuestions.length} raw questions. Mapping to Prisma Schema...`);

  // Map to Prisma model structure
  const mappedQuestions = rawQuestions.map((q) => {
    // Map section name to DB enum equivalents
    let section = "NUMERICAL";
    if (q.section === "Reasoning Ability") {
      section = "LOGICAL";
    } else if (q.section === "Verbal Ability") {
      section = "VERBAL";
    } else if (q.section === "Advanced Quantitative and Reasoning Ability") {
      section = "ADVANCED"; // Fits into Advanced section
    }

    // Map difficulty
    const difficulty = q.difficulty.toUpperCase(); // EASY, MEDIUM, HARD

    // Map options list
    const options = q.options ? q.options.map((o) => o.text) : [];

    // Map correct Option text
    let correctOption = q.correct_answer;
    if (q.question_type === "MCQ" && q.options) {
      const match = q.options.find((o) => o.id === q.correct_answer);
      if (match) {
        correctOption = match.text;
      }
    }

    return {
      section,
      topic: q.topic,
      difficulty,
      questionText: q.question_text,
      options,
      correctOption,
      explanation: q.explanation || "",
    };
  });

  // 3. Clear existing questions
  console.log("Clearing old questions in the database...");
  await prisma.question.deleteMany();

  // 4. Batch insert all 300 questions
  console.log(`Inserting ${mappedQuestions.length} mapped questions...`);
  
  // We can insert sequentially to get error visibility
  for (let i = 0; i < mappedQuestions.length; i++) {
    await prisma.question.create({
      data: mappedQuestions[i]
    });
  }

  console.log(`Database seeded successfully with ${mappedQuestions.length} questions!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
