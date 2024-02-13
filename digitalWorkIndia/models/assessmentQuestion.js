const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;
