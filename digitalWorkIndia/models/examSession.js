const mongoose = require("mongoose");

const examSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
      correctOption: { 
        type: String,
        required: true,
      },
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ExamSession = mongoose.model("ExamSession", examSessionSchema);

module.exports = ExamSession;
