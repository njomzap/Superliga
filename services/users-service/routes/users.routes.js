const express = require("express");
const router = express.Router();

// Import controller functions
const {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  getAllUsers,
  getMyMatches
} = require("../controllers/users.controllers"); // ensure the file is named users.controller.js

// Import middleware
const { auth, adminOnly } = require("../middleware/auth.middleware");

// ------------------ PUBLIC ROUTES ------------------
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// ------------------ USER PROTECTED ROUTES ------------------
router.get("/me", auth, getMe);
router.get("/me/matches", auth, getMyMatches);

// ------------------ ADMIN ONLY ROUTES ------------------
router.get("/", auth, adminOnly, getAllUsers);

module.exports = router;
