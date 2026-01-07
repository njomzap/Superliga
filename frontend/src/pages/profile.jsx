import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5002/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    await fetch("http://localhost:5002/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <p style={{ color: "#333" }}>Loading...</p>;

  return (
    <div style={{ backgroundColor: "#f4f6f8", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "#222", marginBottom: "20px" }}>👤 My Profile</h1>

        {/* User Info Card */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          color: "#222"
        }}>
          <p><strong>Full Name:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>

        {/* User Activity Stats */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          color: "#222"
        }}>
          <h2 style={{ marginBottom: "15px" }}>📊 Activity Stats</h2>
          <p><strong>Logins:</strong> {user.stats?.logins || 0}</p>
          <p><strong>Logouts:</strong> {user.stats?.logouts || 0}</p>
          <p><strong>Last Login:</strong> {user.stats?.lastLogin ? new Date(user.stats.lastLogin).toLocaleString() : "N/A"}</p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
