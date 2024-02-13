const User = require("../models/user");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProfile = await User.findById(userId).select("-password -salt -documents");
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; 

    let userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const { name, email, address, contact } = req.body.newDetails;
    userProfile.name = name || userProfile.name;
    userProfile.email = email || userProfile.email;
    userProfile.address = address || userProfile.address;
    userProfile.contact = contact || userProfile.contact;

    await userProfile.save();

    res.json({ message: "User profile updated successfully", userProfile });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    const { originalname, mimetype, buffer } = req.file;

    userProfile.profileImage = {
      data: buffer,
      contentType: mimetype
    };

    await userProfile.save();

    res.json({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you're using authentication middleware to attach user ID to request object
    const userProfile = await User.findById(userId);

    if (!userProfile || !userProfile.profileImage) {
      return res.status(404).json({ error: "Profile picture not found" });
    }

    const { data, contentType } = userProfile.profileImage;

    res.set('Content-Type', contentType);
    res.send(data);
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
