import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SkinTone() {
  const nav = useNavigate();
  const [selectedSkin, setSelectedSkin] = useState("");

  const skinOptions = ["🤍 Fair", "🤎 Medium", "🖤 Dark", "🌟 Olive", "☕ Caramel"];

  return (
    <div className="page">
      <h2>🎭 Select Your Skin Tone</h2>
      <p style={{ color: "#777", marginBottom: "15px" }}>Choose your skin tone</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {skinOptions.map((tone) => (
          <button
            key={tone}
            onClick={() => setSelectedSkin(tone)}
            style={{
              background: selectedSkin === tone ? "#ffb6c1" : "#eee",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {tone}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (!selectedSkin) {
            alert("Please select your skin tone 🎭");
            return;
          }
          console.log("Selected Skin Tone:", selectedSkin);
          nav("/next-step"); // Replace with your next page route
        }}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: selectedSkin ? "#4caf50" : "#ccc",
          color: "#fff",
          cursor: selectedSkin ? "pointer" : "not-allowed",
        }}
      >
        Next →
      </button>
    </div>
  );
}

export default SkinTone;
