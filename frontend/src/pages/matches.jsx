import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5001/api/matches?limit=${limit}`
      );
      const data = await res.json();
      setMatches(data);
      setLoading(false);
    }

    fetchMatches();
  }, [limit]);

  const filteredMatches = matches.filter(
    (m) =>
      m.home.toLowerCase().includes(search.toLowerCase()) ||
      m.away.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      {/* Container */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ marginBottom: "10px", color: "#222" }}>
            ⚽ Superliga Matches
          </h1>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            Browse recent fixtures from the league
          </p>

          <input
            type="text"
            placeholder="Search by team name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              color: "#222",
            }}
          />
        </div>

        {/* Matches */}
        {loading ? (
          <p>Loading matches...</p>
        ) : filteredMatches.length === 0 ? (
          <p style={{ color: "#666" }}>No matches found.</p>
        ) : (
          filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        )}

        {/* Load more */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => setLimit((prev) => prev + 5)}
            style={{
              padding: "12px 28px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Load more matches
          </button>
        </div>
      </div>
    </div>
  );
}

function MatchCard({ match }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "16px 20px",
        marginBottom: "14px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
      }}
    >
      {/* Left */}
      <div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#222",
          }}
        >
          {match.home}{" "}
          <span style={{ color: "#aaa", fontWeight: "400" }}>vs</span>{" "}
          {match.away}
        </div>

        <div
          style={{
            fontSize: "13px",
            color: "#777",
            marginTop: "6px",
          }}
        >
          {match.league} • {match.date} • {match.time}
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          padding: "6px 14px",
          borderRadius: "20px",
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        FT
      </div>
    </div>
  );
}
