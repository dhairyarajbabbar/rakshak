const express = require("express");
const {
  createUser,
  loginUser,
  logout,
} = require("../controllers/auth");

const router = express.Router();
router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/logout", logout)

exports.router = router;