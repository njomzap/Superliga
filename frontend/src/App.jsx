import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/register";
import MatchesPage from "./pages/matches.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
        <h1>Superliga e Futbollit</h1>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
          <Link to="/matches">Matches</Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to Superliga</h2>} />
          <Route path="/register" element={<Register />} />
          <Route path="/matches" element={<MatchesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
