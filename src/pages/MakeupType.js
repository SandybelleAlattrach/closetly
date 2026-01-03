import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MakeupType() {
  const nav = useNavigate();
  const [selectedMakeup, setSelectedMakeup] = useState("");

  const makeupOptions = [
    "💄 Natural",
    "✨ Glam",
    "🌸 Soft",
    "🎀 Cute",
    "🔥 Bold",
    "🖤 Smokey",
    "💋 Lip Focus",
    "🎨 Artistic",
    "🌟 Highlighted",
    "💚 Green Accent"
  ];

  return (
    <div className="page">
      <h2>💄 Select Your Makeup</h2>
      <p style={{ color: "#777", marginBottom: "15px" }}>
        Choose your makeup style
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {makeupOptions.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedMakeup(type)}
            style={{
              background: selectedMakeup === type ? "#ffb6c1" : "#eee",
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
          if (!selectedMakeup) {
            alert("Please select your makeup 💄");
            return;
          }
          console.log("Selected Makeup:", selectedMakeup);
          nav("/skin-tone"); // Navigate to SkinTone page
        }}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: selectedMakeup ? "#4caf50" : "#ccc",
          color: "#fff",
          cursor: selectedMakeup ? "pointer" : "not-allowed",
        }}
      >
        Next →
      </button>
    </div>
  );
}

export default MakeupType;
