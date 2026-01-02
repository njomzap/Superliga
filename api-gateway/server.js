require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MATCHES_SERVICE_URL = "http://localhost:5001";

// ---- ROUTES ----

app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get(
      `${MATCHES_SERVICE_URL}/api/matches`,
      { params: req.query }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Matches service unavailable" });
  }
});

app.get("/api/matches/team/:team", async (req, res) => {
  try {
    const response = await axios.get(
      `${MATCHES_SERVICE_URL}/api/matches/team/${req.params.team}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Matches service unavailable" });
  }
});

app.get("/api/matches/date/:date", async (req, res) => {
  try {
    const response = await axios.get(
      `${MATCHES_SERVICE_URL}/api/matches/date/${req.params.date}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Matches service unavailable" });
  }
});

app.get("/health", (req, res) => {
  res.json({
    service: "api-gateway",
    status: "OK",
    time: new Date().toISOString(),
  });
});

// ---- START SERVER (THIS WAS THE MISSING PART) ----

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
