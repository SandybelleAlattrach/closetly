import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
  const navigate = useNavigate();

  // State للأيميل والباسورد
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        alert(data.message || "Login failed!");
        return;
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful ✅");
        navigate("/dashboard"); // بعد login
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
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
          value={loginEmail}                // صار مطابق للـ state
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={loginPassword}             // صار مطابق للـ state
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button className="next-btn" onClick={handleLogin}>
          Login →
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

export default Login;
