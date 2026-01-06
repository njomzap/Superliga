// src/services/stats.service.js

// Node 18+ has native fetch
const fetch = global.fetch;

const MATCHES_SERVICE_URL =
  process.env.MATCHES_SERVICE_URL || "http://localhost:5000/api/matches";

/**
 * OVERVIEW STATS
 * - total matches
 * - finished matches
 * - total goals
 * - avg goals per match
 */
async function getOverviewStats() {
  const res = await fetch(MATCHES_SERVICE_URL);
  const matches = await res.json();

  let totalMatches = 0;
  let finishedMatches = 0;
  let totalGoals = 0;

  for (const match of matches) {
    totalMatches++;

    if (match.status === "FT" && match.score?.includes(":")) {
      finishedMatches++;

      const [homeGoals, awayGoals] = match.score
        .split(":")
        .map(Number);

      totalGoals += homeGoals + awayGoals;
    }
  }

  return {
    totalMatches,
    finishedMatches,
    totalGoals,
    averageGoalsPerMatch:
      finishedMatches > 0
        ? (totalGoals / finishedMatches).toFixed(2)
        : "0.00",
  };
}

/**
 * LEAGUE STANDINGS
 */
async function getStandings() {
  const res = await fetch(MATCHES_SERVICE_URL);
  const matches = await res.json();

  const table = {};

  for (const match of matches) {
    if (match.status !== "FT") continue;
    if (!match.score || !match.score.includes(":")) continue;

    const [homeGoals, awayGoals] = match.score
      .split(":")
      .map(Number);

    const home = match.home;
    const away = match.away;

    if (!table[home]) {
      table[home] = {
        team: home,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      };
    }

    if (!table[away]) {
      table[away] = {
        team: away,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      };
    }

    const homeTeam = table[home];
    const awayTeam = table[away];

    homeTeam.played++;
    awayTeam.played++;

    homeTeam.goalsFor += homeGoals;
    homeTeam.goalsAgainst += awayGoals;

    awayTeam.goalsFor += awayGoals;
    awayTeam.goalsAgainst += homeGoals;

    if (homeGoals > awayGoals) {
      homeTeam.wins++;
      homeTeam.points += 3;
      awayTeam.losses++;
    } else if (homeGoals < awayGoals) {
      awayTeam.wins++;
      awayTeam.points += 3;
      homeTeam.losses++;
    } else {
      homeTeam.draws++;
      awayTeam.draws++;
      homeTeam.points += 1;
      awayTeam.points += 1;
    }
  }

  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;

    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;

    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });
}

module.exports = {
  getOverviewStats,
  getStandings,
};
