const { fetchMatches } = require("../services/footballAPI");

// Helper to format score
const formatScore = (score) => {
  if (score && score.ft && score.ft.length === 2) {
    return `${score.ft[0]}:${score.ft[1]}`;
  }
  return "-:-"; // for upcoming matches
};

// -------------------- Get latest matches --------------------
const getLatestMatches = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const matchesData = await fetchMatches();

    const matches = matchesData
      .slice(-limit)
      .map((match, index) => ({
        id: index + 1,
        date: match.date,
        time: match.time || "TBD",
        home: match.team1,
        away: match.team2,
        score: formatScore(match.score),
        status: match.score && match.score.ft ? "FT" : "UPCOMING",
        league: "P",
      }));

    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};

// -------------------- Get matches by team --------------------
const getMatchesByTeam = async (req, res) => {
  try {
    const teamParam = req.params.team.toLowerCase();

    const matchesData = await fetchMatches();

    const filtered = matchesData.filter((match) => {
      const home = match.team1?.name?.toLowerCase() || match.team1.toLowerCase();
      const away = match.team2?.name?.toLowerCase() || match.team2.toLowerCase();

      return home.includes(teamParam) || away.includes(teamParam);
    });

    const result = filtered
      .slice(-10)
      .map((match, index) => ({
        id: index + 1,
        date: match.date,
        time: match.time || "TBD",
        home: match.team1,
        away: match.team2,
        score: formatScore(match.score),
        status: match.score && match.score.ft ? "FT" : "UPCOMING",
        league: match.league || "P",
      }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter matches" });
  }
};

// -------------------- Get matches by date --------------------
const getMatchesByDate = async (req, res) => {
  try {
    const date = req.params.date;

    const matchesData = await fetchMatches();

    const filtered = matchesData
      .filter((match) => match.date === date)
      .map((match, index) => ({
        id: index + 1,
        date: match.date,
        time: match.time || "TBD",
        home: match.team1,
        away: match.team2,
        score: formatScore(match.score),
        status: match.score && match.score.ft ? "FT" : "UPCOMING",
        league: "P",
      }));

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter matches by date" });
  }
};

module.exports = { getLatestMatches, getMatchesByTeam, getMatchesByDate };
