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
      if (!res.ok) return setMessage(data.message || "Login failed");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const profileRes = await fetch("http://localhost:5002/api/users/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });

      setUser(await profileRes.json());
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="form">
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
        <button className="btn">Login</button>
      </form>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}

      <p style={{ marginTop: 15 }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
