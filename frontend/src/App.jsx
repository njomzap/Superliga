import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import MatchesPage from "./pages/matches.jsx";
import StatsPage from "./pages/stats.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

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
      <Navbar user={user} setUser={setUser} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile setUser={setUser} />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route
            path="/stats"
            element={
              user ? <StatsPage /> : <h2 style={{ textAlign: "center", marginTop: "50px" }}>You need to log in to view stats!</h2>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <footer className="footer">
        Superliga App © 2025 — Made for fun ⚽
      </footer>
    </BrowserRouter>
  );
}

/* ---------- NAVBAR COMPONENT ---------- */
function Navbar({ user, setUser }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">⚽ Superliga</Link>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/matches" className={location.pathname === "/matches" ? "active" : ""}>Matches</Link>

        {user ? (
          <>
            <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>{user.full_name}</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
            <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

/* ---------- HOME PAGE ---------- */
function Home({ user }) {
  return (
    <div className="home">
      <h1>Welcome to Superliga!</h1>
      {!user ? (
        <p>
          Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to continue.
        </p>
      ) : (
        <div className="home-buttons">
          <Link to="/matches" className="btn">View Matches</Link>
          <Link to="/stats" className="btn">View Stats</Link>
          <Link to="/profile" className="btn">Profile</Link>
        </div>
      )}
    </div>
  );
}

export default App;

