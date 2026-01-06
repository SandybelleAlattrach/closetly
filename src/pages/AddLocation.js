import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css"; 

function AddLocation() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (city.trim() === "") {
      alert("Please enter your city 🌍");
      return;
    }
    navigate("/color-preference");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>📍 Add Your City</h2>
        <p>Tell us where you are so we match your outfit with the weather</p>

        <input
          type="text"
          className="auth-input"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="next-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default AddLocation;
