const { matchesAPI, usersAPI } = require("../utils/apiClient");

async function getOverviewStats() {
  try {
    const [matchesRes, usersRes] = await Promise.all([
      matchesAPI.get("/matches"),
      usersAPI.get("/users")
    ]);

    const matches = matchesRes.data;
    const users = usersRes.data;

    const playedMatches = matches.filter(m => m.status === "played");
    const totalGoals = playedMatches.reduce(
      (sum, m) => sum + (m.homeGoals || 0) + (m.awayGoals || 0),
      0
    );

    return {
      totalMatches: matches.length,
      playedMatches: playedMatches.length,
      upcomingMatches: matches.length - playedMatches.length,
      totalGoals,
      avgGoalsPerMatch:
        playedMatches.length > 0
          ? (totalGoals / playedMatches.length).toFixed(2)
          : 0,
      totalUsers: users.length,
      totalPlayers: users.filter(u => u.role === "player").length,
      totalAdmins: users.filter(u => u.role === "admin").length
    };
  } catch (err) {
    console.error("STATS SERVICE ERROR:");
    console.error(err.message);
    throw err;
  }
}

module.exports = { getOverviewStats };
