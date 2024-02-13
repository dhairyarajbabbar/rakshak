// const multer = require('multer');

const User = require("../models/user");

// const upload = multer({ dest: 'uploads/' , }, (req, res)=>{
//   console.log(req.file);
// }); // Set the destination folder where uploaded files will be stored

exports.uploadDocument = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    const { originalname, mimetype, buffer } = req.file;
    const newDocument = {
      type: originalname,
      description: req.body.description,
      imageData: {
        data: buffer,
        contentType: mimetype
      }
    };
    userProfile.documents.push(newDocument);
    await userProfile.save();

    res.json({ message: "Document uploaded successfully", document: newDocument });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getDocument = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const documentId = req.params.documentId;
    const document = userProfile.documents.id(documentId);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.set('Content-Type', document.imageData.contentType);
    res.send(document.imageData.data);
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    const documentId = req.params.documentId;
    const document = userProfile.documents.id(documentId);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    document.remove();

    await userProfile.save();

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUserDocuments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const userDocuments = userProfile.documents;
    res.json(userDocuments);
  } catch (error) {
    console.error("Error fetching user documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};