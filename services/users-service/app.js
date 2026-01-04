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

// Users routes (corrected)
const usersRoutes = require("./routes/users.routes");
app.use("/api/users", usersRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
