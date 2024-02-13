const ExamSession = require("../models/examSession");
const mongoose = require("mongoose");
// const AssessmentQuestion = require("../models/assessmentQuestion");
const assessmentQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: "H2O"
  },
  {
    question: "What is the tallest mammal?",
    options: ["Giraffe", "Elephant", "Horse", "Whale"],
    correctAnswer: "Giraffe"
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Mitochondria", "Nucleus", "Endoplasmic Reticulum", "Golgi Apparatus"],
    correctAnswer: "Mitochondria"
  },
  {
    question: "Which country is famous for the Great Wall?",
    options: ["China", "India", "USA", "Italy"],
    correctAnswer: "China"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon dioxide"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: "Au"
  }
];

exports.startExamSession = async (req, res) => {
  try {
    const userId = req.user.userId;
    const activeExamSession = await ExamSession.findOne({ userId, completed: false });
    if (activeExamSession) {
      // return res.status(400).json({ error: "An active exam session already exists for the user" });
    }
    if (!assessmentQuestions || assessmentQuestions.length === 0) {
      return res.status(404).json({ error: "No assessment questions found" });
    }
    const selectedQuestions = getRandomQuestions(assessmentQuestions, 10); 
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + selectedQuestions.length * 2 * 60 * 1000); // Add 2 minutes per question
    
    // Map assessment questions to exam session questions including correct answers
    const examSessionQuestions = selectedQuestions.map(question => ({
      questionId: question._id,
      selectedOption: "none",
      correctOption: question.correctAnswer // Include the correct answer
    }));

    const newExamSession = await ExamSession.create({ 
      userId, 
      questions: examSessionQuestions,
      startTime,
      endTime,
      score: 0,
      result: "fail"
    });
    res.json({ message: "Exam session started successfully", questions: selectedQuestions, examSessionId: newExamSession._id });
  } catch (error) {
    console.error("Error starting exam session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
function getRandomQuestions(questions, count) {
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, count).map(question => ({
    _id: new mongoose.Types.ObjectId(), // Added unique ID for each question
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer
  }));
}
exports.submitExamAnswers = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { examSessionId, answers } = req.body; 
    const currentTime = new Date();
    const examSession = await ExamSession.findById(examSessionId);
    if (!examSession) {
      return res.status(404).json({ error: "Exam session not found" });
    }
    if (examSession.userId.toString() !== userId) {
      return res.status(403).json({ error: "You are not authorized to submit answers for this exam session" });
    }
    if (currentTime > examSession.endTime) {
      return res.status(400).json({ error: "Exam session has ended" });
    }
    // Get correct answers for questions
    const correctAnswers = examSession.questions.map(question => question.correctOption);
    
    // Update selected options for answered questions
    examSession.questions.forEach((question, index) => {
      if (answers[index] !== undefined) {
        question.selectedOption = answers[index];
      } else {
        question.selectedOption = "none"; 
      }
    });

    examSession.completed = true;
    const score = calculateScore(examSession.questions, answers, correctAnswers);
    examSession.score = score;
    examSession.result = score >= 5 ? "pass" : "fail";
    await examSession.save();
    res.json({ message: "Exam answers submitted successfully", score });
  } catch (error) {
    console.error("Error submitting exam answers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


function calculateScore(questions, answers, correctAnswers) {
  let score = 0;
  questions.forEach((question, index) => {
    if (answers[index] === correctAnswers[index]) {
      score++;
    }
  });
  return score;
}


exports.getExamResults = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { examSessionId } = req.query;
    const examSession = await ExamSession.findById(examSessionId);
    if (!examSession) {
      return res.status(404).json({ error: "Exam session not found" });
    }
    if (examSession.userId.toString() !== userId) {
      return res.status(403).json({ error: "You are not authorized to view results for this exam session" });
    }
    res.json(examSession);
  } catch (error) {
    console.error("Error fetching exam results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserExamSessions = async (req, res) => {
  try {
    const userId = req.user.userId; 

    const userExamSessions = await ExamSession.find({ userId });
    const examSessionIds = userExamSessions.map(session => session._id);

    res.json(userExamSessions );
  } catch (error) {
    console.error("Error fetching user exam sessions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
