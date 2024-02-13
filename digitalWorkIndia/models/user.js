const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Buffer,
    required: true,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  profileImage: {
    data: Buffer, // Image data stored as Buffer
    contentType: String, // MIME type of the image (e.g., "image/jpeg", "image/png")
  },
  documents: [
    {
      type: {
        type: String,
        required: true,
      },
      description: String,
      imageData: {
        data: Buffer, // Document/image data stored as Buffer
        contentType: String, // MIME type of the document/image
      },
    },
  ],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
