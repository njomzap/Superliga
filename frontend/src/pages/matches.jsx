import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5001/api/matches?limit=${limit}`);
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, [limit]);

  const filteredMatches = matches.filter(
    (m) =>
      m.home.toLowerCase().includes(search.toLowerCase()) ||
      m.away.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>⚽ Superliga Matches</h1>
      <p>Browse the latest fixtures</p>

      <input
        type="text"
        placeholder="Search by team..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Loading matches...</p>
      ) : filteredMatches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button className="btn" onClick={() => setLimit((prev) => prev + 5)}>
          Load more matches
        </button>
      </div>
    </div>
  );
}

function MatchCard({ match }) {
  const isPlayed = match.status === "FT";
  const [homeScore, awayScore] = isPlayed ? match.score.split(":") : ["-", "-"];

  return (
    <div className="match-card">
      <div>
        <strong>{match.home}</strong> vs <strong>{match.away}</strong>
        <div className="match-info">
          {match.league} • {match.date} • {match.time}
        </div>
      </div>

      <div className="match-right">
        <div className="match-score">{homeScore} : {awayScore}</div>
        <div className={`match-status ${isPlayed ? "played" : "upcoming"}`}>
          {isPlayed ? "FT" : "UPCOMING"}
        </div>
      </div>
    </div>
  );
}

