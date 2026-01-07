const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
const axios = require("axios");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

// ------------------ REGISTER ------------------
async function register(req, res) {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
}

// ------------------ LOGIN ------------------
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log the login action
    await pool.query(
      "INSERT INTO admin_logs (user_id, action) VALUES ($1, 'login')",
      [user.id]
    );

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)",
      [user.id, refreshToken]
    );

    res.json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// ------------------ GET CURRENT USER PROFILE ------------------
async function getMe(req, res) {
  try {
    // 1️⃣ Fetch basic user info
    const result = await pool.query(
      `SELECT id, full_name, email, role, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // 2️⃣ Fetch login/logout stats
    const statsResult = await pool.query(
      `SELECT 
         COUNT(*) FILTER (WHERE action = 'login') AS logins,
         COUNT(*) FILTER (WHERE action = 'logout') AS logouts,
         MAX(created_at) FILTER (WHERE action = 'login') AS last_login,
         MAX(created_at) FILTER (WHERE action = 'logout') AS last_logout
       FROM admin_logs
       WHERE user_id = $1`,
      [req.user.id]
    );

    const stats = statsResult.rows[0];

    user.stats = {
      logins: parseInt(stats.logins),
      logouts: parseInt(stats.logouts),
      lastLogin: stats.last_login,
      lastLogout: stats.last_logout
    };

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// ------------------ LOGOUT ------------------
async function logout(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Log the logout action
    await pool.query(
      "INSERT INTO admin_logs (user_id, action) VALUES ($1, 'logout')",
      [decoded.id]
    );

    await pool.query(
      "DELETE FROM refresh_tokens WHERE token = $1",
      [refreshToken]
    );

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


// ------------------ GET ALL USERS (ADMIN) ------------------
async function getAllUsers(req, res) {
  try {
    const users = await pool.query(
      "SELECT id, full_name, email, role FROM users"
    );
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// ------------------ REFRESH TOKEN ------------------
async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const stored = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token = $1",
      [refreshToken]
    );

    if (stored.rows.length === 0) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const userResult = await pool.query(
      "SELECT id, email, role FROM users WHERE id = $1",
      [decoded.id]
    );

    const user = userResult.rows[0];

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
}

// ------------------ GET MY MATCHES ------------------
async function getMyMatches(req, res) {
  try {
    const userId = req.user.id;

    // Example: fetch user-specific match stats from stats service
    const response = await axios.get(`http://localhost:5003/api/stats/user/${userId}`);
    const matchesStats = response.data;

    res.json(matchesStats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch match stats" });
  }
}


module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  getAllUsers,
  getMyMatches,
};
