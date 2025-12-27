const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    service: "users-service",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// Placeholder users route
app.get("/api/users", (req, res) => {
  res.json({ message: "Users endpoint working" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app; // 👈 THIS LINE IS CRITICAL
