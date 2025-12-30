// app.js
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

// Users routes
app.use("/api/users", require("./routes/users.routes"));

// 404 handler (keep at the bottom)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app; // 👈 critical export
