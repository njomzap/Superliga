import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import MatchesPage from "./pages/matches.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in by fetching /me
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5002/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <header style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
        <h1>Superliga e Futbollit</h1>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          {user ? (
            <>
              <Link to="/profile" style={{ marginRight: "10px" }}>Profile</Link>
              <Link to="/stats">Stats</Link>
            </>
          ) : (
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          )}
          <Link to="/matches" style={{ marginLeft: "10px" }}>Matches</Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile setUser={setUser} />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="*" element={<h2>You need to be logged in to view stats!</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
