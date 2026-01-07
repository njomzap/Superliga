const fetch = global.fetch;

const MATCHES_SERVICE_URL =
   "http://localhost:5001/api/matches";

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


/**
 * TEAM FORM
 * Returns the last N matches results for each team
 */
async function getTeamForm(lastN = 5) {
  const res = await fetch(MATCHES_SERVICE_URL);
  const matches = await res.json();

  const form = {};

  // Filter only finished matches
  const finishedMatches = matches.filter(
    (m) => m.status === "FT" && m.score?.includes(":")
  );

  // Sort matches by date ascending so we can take the last N
  finishedMatches.sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const match of finishedMatches) {
    const [homeGoals, awayGoals] = match.score.split(":").map(Number);
    const home = match.home;
    const away = match.away;

    // Initialize form array if it doesn't exist
    if (!form[home]) form[home] = [];
    if (!form[away]) form[away] = [];

    // Home result
    if (homeGoals > awayGoals) form[home].push("W");
    else if (homeGoals < awayGoals) form[home].push("L");
    else form[home].push("D");

    // Away result
    if (awayGoals > homeGoals) form[away].push("W");
    else if (awayGoals < homeGoals) form[away].push("L");
    else form[away].push("D");

    // Keep only last N results
    if (form[home].length > lastN) form[home].shift();
    if (form[away].length > lastN) form[away].shift();
  }

  return form;
}

async function getFinishedMatches() {
  const res = await fetch(MATCHES_SERVICE_URL);
  const matches = await res.json();

  return matches.filter(
    (m) => m.status === "FT" && m.score?.includes(":")
  );
}


async function getHomeAwayStats() {
  const matches = await getFinishedMatches();
  const stats = {};

  for (const match of matches) {
    const [homeGoals, awayGoals] = match.score.split(":").map(Number);
    const home = match.home;
    const away = match.away;

    if (!stats[home]) {
      stats[home] = {
        team: home,
        home: { wins: 0, draws: 0, losses: 0, goals: 0, points: 0 },
        away: { wins: 0, draws: 0, losses: 0, goals: 0, points: 0 },
      };
    }

    if (!stats[away]) {
      stats[away] = {
        team: away,
        home: { wins: 0, draws: 0, losses: 0, goals: 0, points: 0 },
        away: { wins: 0, draws: 0, losses: 0, goals: 0, points: 0 },
      };
    }

    stats[home].home.goals += homeGoals;
    stats[away].away.goals += awayGoals;

    if (homeGoals > awayGoals) {
      stats[home].home.wins++;
      stats[home].home.points += 3;
      stats[away].away.losses++;
    } else if (homeGoals < awayGoals) {
      stats[away].away.wins++;
      stats[away].away.points += 3;
      stats[home].home.losses++;
    } else {
      stats[home].home.draws++;
      stats[away].away.draws++;
      stats[home].home.points++;
      stats[away].away.points++;
    }
  }

  return Object.values(stats);
}


async function getLeaders() {
  const matches = await getFinishedMatches();
  const teams = {};

  for (const match of matches) {
    const [hg, ag] = match.score.split(":").map(Number);

    if (!teams[match.home])
      teams[match.home] = { team: match.home, scored: 0, conceded: 0 };

    if (!teams[match.away])
      teams[match.away] = { team: match.away, scored: 0, conceded: 0 };

    teams[match.home].scored += hg;
    teams[match.home].conceded += ag;

    teams[match.away].scored += ag;
    teams[match.away].conceded += hg;
  }

  const list = Object.values(teams);

  return {
    bestAttack: [...list].sort((a, b) => b.scored - a.scored)[0],
    bestDefense: [...list].sort((a, b) => a.conceded - b.conceded)[0],
    worstDefense: [...list].sort((a, b) => b.conceded - a.conceded)[0],
  };
}


async function getTeamStreaks() {
  const matches = await getFinishedMatches();

  matches.sort((a, b) => new Date(a.date) - new Date(b.date));
  const streaks = {};

  for (const match of matches) {
    const [hg, ag] = match.score.split(":").map(Number);
    const home = match.home;
    const away = match.away;

    if (!streaks[home]) streaks[home] = [];
    if (!streaks[away]) streaks[away] = [];

    streaks[home].push(hg > ag ? "W" : hg < ag ? "L" : "D");
    streaks[away].push(ag > hg ? "W" : ag < hg ? "L" : "D");
  }

  const result = {};

  for (const team in streaks) {
    const arr = streaks[team];
    let count = 1;

    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] === arr[i - 1]) count++;
      else break;
    }

    result[team] = {
      team,
      currentStreak: arr[arr.length - 1],
      length: count,
      sequence: arr.slice(-5),
    };
  }

  return result;
}


async function getHeadToHead(teamA, teamB) {
  const matches = await getFinishedMatches();

  const h2h = {
    played: 0,
    [teamA]: { wins: 0, goals: 0 },
    [teamB]: { wins: 0, goals: 0 },
    draws: 0,
  };

  for (const match of matches) {
    if (
      !(
        (match.home === teamA && match.away === teamB) ||
        (match.home === teamB && match.away === teamA)
      )
    )
      continue;

    const [hg, ag] = match.score.split(":").map(Number);
    h2h.played++;

    if (match.home === teamA) {
      h2h[teamA].goals += hg;
      h2h[teamB].goals += ag;
      if (hg > ag) h2h[teamA].wins++;
      else if (hg < ag) h2h[teamB].wins++;
      else h2h.draws++;
    } else {
      h2h[teamB].goals += hg;
      h2h[teamA].goals += ag;
      if (hg > ag) h2h[teamB].wins++;
      else if (hg < ag) h2h[teamA].wins++;
      else h2h.draws++;
    }
  }

  return h2h;
}


module.exports = {
  getOverviewStats,
  getStandings,
  getTeamForm,
  getHomeAwayStats,
  getLeaders,
  getTeamStreaks,
  getHeadToHead
};
