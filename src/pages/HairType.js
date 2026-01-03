import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HairType() {
  const nav = useNavigate();
  const [selectedHair, setSelectedHair] = useState("");

  const hairTypes = ["💫 Straight", "🌊 Wavy", "🌀 Curly", "🔥 Coily"];

  return (
    <div className="page">
      <h2>💇‍♀️ Select Your Hair Type</h2>
      <p style={{ color: "#777", marginBottom: "15px" }}>Choose your hair type</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {hairTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedHair(type)}
            style={{
              background: selectedHair === type ? "#ffb6c1" : "#eee",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (!selectedHair) {
            alert("Please select your hair type 💇‍♀️");
            return;
          }
          console.log("Selected Hair Type:", selectedHair);
          nav("/next-page");
        }}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: selectedHair ? "#4caf50" : "#ccc",
          color: "#fff",
          cursor: selectedHair ? "pointer" : "not-allowed",
        }}
      >
        Next
      </button>
    </div>
  );
}

export default HairType;
