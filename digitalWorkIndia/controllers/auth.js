const User = require("../models/user");
const { genPassword, validPassword } = require("../utils/passwordUtils");
const { issueJWT } = require("../utils/jwtUtils");

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { hash, salt } = genPassword(req.body.password);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      salt: salt,
      address: req.body.address,
      contact: req.body.contact,
    });
    const jwtToken = issueJWT(newUser);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: jwtToken.token,
      expiresIn: jwtToken.expires,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(req.body);
    const isValidPassword = validPassword(
      req.body.password,
      user.password,
      user.salt
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const jwtToken = issueJWT(user);

    res.cookie("token", jwtToken.token, {
      httpOnly: true,
      maxAge: jwtToken.expiresIn,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    maxAge:new Date(Date.now() + 5000),
    httpOnly: true,
    sameSite: "none",
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
