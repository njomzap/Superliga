import { useState, useEffect } from "react";

export default function StatsPage() {
  const [overview, setOverview] = useState(null);
  const [standings, setStandings] = useState([]);
  const [teamForm, setTeamForm] = useState({});
  const [homeAway, setHomeAway] = useState([]);
  const [leaders, setLeaders] = useState({});
  const [streaks, setStreaks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const baseUrl = "http://localhost:5003/api/stats";

        const [
          overviewRes,
          standingsRes,
          formRes,
          homeAwayRes,
          leadersRes,
          streaksRes,
        ] = await Promise.all([
          fetch(`${baseUrl}/overview`),
          fetch(`${baseUrl}/standings`),
          fetch(`${baseUrl}/team-form`),
          fetch(`${baseUrl}/home-away`),
          fetch(`${baseUrl}/leaders`),
          fetch(`${baseUrl}/streaks`),
        ]);

        if (!overviewRes.ok) throw new Error("Failed to fetch overview stats");

        const overviewData = await overviewRes.json();
        const standingsData = await standingsRes.json();
        const formData = await formRes.json();
        const homeAwayData = await homeAwayRes.json();
        const leadersData = await leadersRes.json();
        const streaksData = await streaksRes.json();

        setOverview(overviewData);
        setStandings(standingsData);
        setTeamForm(formData);
        setHomeAway(homeAwayData);
        setLeaders(leadersData);
        setStreaks(streaksData);
      } catch (err) {
        console.error(err);
        setError("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Loading stats...</p>;
  if (error) return <p style={{ color: "#fff" }}>{error}</p>;

  const cardStyle = {
    background: "#ffffff",
    color: "#222",
    padding: "15px",
    borderRadius: "8px",
    minWidth: "150px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    color: "#fff", // all letters white
  };

  const thTdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    color: "#fff", // white text for all cells
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#1e1e2f", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px", color: "#fff" }}>Superliga Stats</h1>

      {/* Overview */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#ffd700" }}>Overview</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            ["Total Matches", overview.totalMatches],
            ["Finished Matches", overview.finishedMatches],
            ["Total Goals", overview.totalGoals],
            ["Average Goals per Match", overview.averageGoalsPerMatch],
          ].map(([label, value]) => (
            <div key={label} style={cardStyle}>
              <strong style={{ fontSize: "18px" }}>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* League Standings */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#ffd700" }}>League Standings</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#2e2e44" }}>
              <th style={thTdStyle}>#</th>
              <th style={thTdStyle}>Team</th>
              <th style={thTdStyle}>P</th>
              <th style={thTdStyle}>W</th>
              <th style={thTdStyle}>D</th>
              <th style={thTdStyle}>L</th>
              <th style={thTdStyle}>GF</th>
              <th style={thTdStyle}>GA</th>
              <th style={thTdStyle}>Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, idx) => (
              <tr key={team.team} style={{ background: idx % 2 === 0 ? "#2e2e44" : "#1e1e2f" }}>
                <td style={thTdStyle}>{idx + 1}</td>
                <td style={thTdStyle}>{team.team}</td>
                <td style={thTdStyle}>{team.played}</td>
                <td style={thTdStyle}>{team.wins}</td>
                <td style={thTdStyle}>{team.draws}</td>
                <td style={thTdStyle}>{team.losses}</td>
                <td style={thTdStyle}>{team.goalsFor}</td>
                <td style={thTdStyle}>{team.goalsAgainst}</td>
                <td style={thTdStyle}>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Leaders */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#ffd700" }}>Leaders</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <strong>Best Attack:</strong> {leaders.bestAttack?.team} ({leaders.bestAttack?.scored} goals)
          </div>
          <div style={cardStyle}>
            <strong>Best Defense:</strong> {leaders.bestDefense?.team} ({leaders.bestDefense?.conceded} goals conceded)
          </div>
          <div style={cardStyle}>
            <strong>Worst Defense:</strong> {leaders.worstDefense?.team} ({leaders.worstDefense?.conceded} goals conceded)
          </div>
        </div>
      </section>

      {/* Team Form */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#ffd700" }}>Team Form (Last 5 Matches)</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#2e2e44" }}>
              <th style={thTdStyle}>Team</th>
              <th style={thTdStyle}>Form</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(teamForm).map(([team, form]) => (
              <tr key={team} style={{ background: "#1e1e2f" }}>
                <td style={thTdStyle}>{team}</td>
                <td style={thTdStyle}>{form.join(" - ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Team Streaks */}
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#ffd700" }}>Current Team Streaks</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#2e2e44" }}>
              <th style={thTdStyle}>Team</th>
              <th style={thTdStyle}>Current Streak</th>
              <th style={thTdStyle}>Length</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(streaks).map((team) => (
              <tr key={team.team} style={{ background: "#1e1e2f" }}>
                <td style={thTdStyle}>{team.team}</td>
                <td style={thTdStyle}>{team.currentStreak}</td>
                <td style={thTdStyle}>{team.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
