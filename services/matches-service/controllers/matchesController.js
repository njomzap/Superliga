const { fetchMatches } = require("../services/footballAPI");

const getLatestMatches = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const matchesData = await fetchMatches();

    const matches = matchesData.slice(-limit).map((match, index) => ({
      id: index + 1,
      date: match.date,
      time: match.time || "TBD",
      home: match.team1,
      away: match.team2,
      status: "FT",
      league: "P",
    }));

    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};

const getMatchesByTeam = async (req, res) => {
  try {
    const teamParam = req.params.team.toLowerCase();

    const matchesData = await fetchMatches();

    const filtered = matchesData.filter((match) => {
      const home = match.team1?.name?.toLowerCase() || match.team1.toLowerCase();
      const away = match.team2?.name?.toLowerCase() || match.team2.toLowerCase();

      return home.includes(teamParam) || away.includes(teamParam);
    });

    res.json(filtered.slice(-10));
  } catch (error) {
    res.status(500).json({ message: "Failed to filter matches" });
  }
};

const getMatchesByDate = async (req, res) => {
  try {
    const date = req.params.date;

    const matchesData = await fetchMatches();

    const filtered = matchesData.filter(
      (match) => match.date === date
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter matches by date" });
  }
};



module.exports = { getLatestMatches, getMatchesByTeam , getMatchesByDate};
