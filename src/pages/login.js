import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

/**
 * Use REACT_APP_API_URL (set at build time) or fall back to your Render URL.
 * Example build:
 * REACT_APP_API_URL=https://closetly-nstg.onrender.com npm run build
 */
const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_RENDER_URL || "https://closetly-nstg.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      alert("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message || "Login failed!");
        return;
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful ✅");
        navigate("/dashboard"); // or change to "/"
      } else {
        alert("Login succeeded but no user returned.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🔐 Login</h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button className="next-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login →"}
        </button>

        <p
          style={{
            marginTop: "15px",
            cursor: "pointer",
            color: "#4caf50",
            textAlign: "center",
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot your password?
        </p>
      </div>
    </div>
  );
}