const {
  getOverviewStats,
  getStandings,
  getTeamForm, 
  getHomeAwayStats,
  getLeaders,
  getTeamStreaks,
  getHeadToHead
} = require("../services/stats.service");

// ------------------ Overview ------------------
async function overview(req, res) {
  try {
    const stats = await getOverviewStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
}

// ------------------ Standings ------------------
async function standings(req, res) {
  try {
    const table = await getStandings();
    res.json(table);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch standings" });
  }
}

// ------------------ Team Form ------------------
async function teamForm(req, res) {
  try {
    const lastN = parseInt(req.query.lastN) || 5; // allow query param to change number of matches
    const form = await getTeamForm(lastN);
    res.json(form);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch team form" });
  }
}

// ------------------ Home/Away Stats ------------------
async function homeAway(req, res) {
  try {
    const stats = await getHomeAwayStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch home/away stats" });
  }
}

// ------------------ Leaders ------------------
async function leaders(req, res) {
  try {
    const data = await getLeaders();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch leaders" });
  }
}

// ------------------ Streaks ------------------
async function streaks(req, res) {
  try {
    const data = await getTeamStreaks();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch streaks" });
  }
}

// ------------------ Head-to-Head ------------------
async function headToHead(req, res) {
  try {
    const { teamA, teamB } = req.query;
    if (!teamA || !teamB) {
      return res.status(400).json({ message: "teamA and teamB required" });
    }

    const data = await getHeadToHead(teamA, teamB);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch head-to-head stats" });
  }
}

// ------------------ User-Specific Stats ------------------
async function userStats(req, res) {
  try {
    const userId = req.params.userId;

    // TODO: Replace this with real logic to fetch matches/stats for this user
    // For now, we return placeholder data
    const stats = {
      userId,
      matchesPlayed: 12,
      wins: 7,
      draws: 3,
      losses: 2,
      lastMatches: [
        { opponent: "Team A", result: "W" },
        { opponent: "Team B", result: "D" },
        { opponent: "Team C", result: "L" },
      ],
    };

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user stats" });
  }
}

module.exports = {
  overview,
  standings,
  teamForm,
  homeAway,
  leaders,
  streaks,
  headToHead,
  userStats, // ✅ new export
};
