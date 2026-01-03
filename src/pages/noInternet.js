import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function NoInternet() {
  const nav = useNavigate();
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      nav("/gender");
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [nav]);

  if (online) return null;

  return (
    <div className="auth-container">
      <h2>⚠️ Connection Error</h2>
      <p>No internet connection detected.</p>
      <p>Please check your connection and try again.</p>

      <button className="next-btn">
        OK
      </button>
    </div>
  );
}

export default NoInternet;
