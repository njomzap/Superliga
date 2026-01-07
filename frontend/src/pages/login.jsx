import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5002/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Fetch user profile after login
      const profileRes = await fetch("http://localhost:5002/api/users/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });

      const profileData = await profileRes.json();
      setUser(profileData);

      navigate("/profile");
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            border: "none",
          }}
        >
          Login
        </button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}

      <p style={{ marginTop: "15px" }}>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "#1e1e1e", fontWeight: "bold" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
