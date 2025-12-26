const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    
    const url =
      "https://raw.githubusercontent.com/openfootball/football.json/master/2023-24/en.1.json";

    const response = await axios.get(url);
    const matchesData = response.data.matches; 

    
    const matches = matchesData.slice(-5).map((match, index) => ({
      id: index + 1,
      date: match.date,
      home: match.team1,
      away: match.team2,
      goalsHome: match.score1,
      goalsAway: match.score2,
      status: "FT",
      league: "Premier League",
    }));

    res.json(matches);
  } catch (error) {
    console.error("Failed to fetch matches:", error.message);
    res.status(500).json({ message: "Failed to fetch matches" });
  }
});

module.exports = router;
