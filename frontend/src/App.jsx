import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login"; // <-- import Login
import MatchesPage from "./pages/matches.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
        <h1>Superliga e Futbollit</h1>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link> {/* Login link */}
          <Link to="/matches">Matches</Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login as main page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
