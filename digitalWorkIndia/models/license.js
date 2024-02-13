const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const License = mongoose.model("License", licenseSchema);

module.exports = License;
