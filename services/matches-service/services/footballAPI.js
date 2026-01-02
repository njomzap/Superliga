const axios = require("axios");

const FOOTBALL_DATA_URL =
  "https://raw.githubusercontent.com/openfootball/football.json/master/2023-24/en.1.json";

async function fetchMatches() {
  const response = await axios.get(FOOTBALL_DATA_URL, {
    headers: { Accept: "application/json" },
  });

  if (!Array.isArray(response.data.matches)) {
    throw new Error("Unexpected football API format");
  }

  return response.data.matches;
}

module.exports = { fetchMatches };
