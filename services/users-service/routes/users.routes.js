const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db/db");

const router = express.Router();

// REGISTER endpoint
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const userExists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await pool.query(
      `INSERT INTO users (full_name, email, password)
       VALUES ($1, $2, $3)`,
      [full_name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // 👈 THIS LINE IS CRITICAL
