// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { swaggerUi, specs } = require("./swagger");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    service: "users-service",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Users routes
const usersRoutes = require("./routes/users.routes");
app.use("/api/users", usersRoutes);

// 404 handler (last!)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
