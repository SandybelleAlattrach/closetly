import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HairColor() {
  const nav = useNavigate();
  const [selectedColor, setSelectedColor] = useState("");

  const colors = ["🖤 Black", "🤎 Brown", "💛 Blonde", "❤️ Red", "✨ Other"];

  return (
    <div className="page">
      <h2>🎨 Select Your Hair Color</h2>
      <p style={{ color: "#777", marginBottom: "15px" }}>Choose your hair color</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              background: selectedColor === color ? "#ffb6c1" : "#eee",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {color}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (!selectedColor) {
            alert("Please select a hair color 🎨");
            return;
          }
          console.log("Selected Hair Color:", selectedColor);
          nav("/hair-type");
        }}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: selectedColor ? "#4caf50" : "#ccc",
          color: "#fff",
          cursor: selectedColor ? "pointer" : "not-allowed",
        }}
      >
        Next
      </button>
    </div>
  );
}

export default HairColor;
