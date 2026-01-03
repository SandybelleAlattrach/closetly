import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MoodSelection() {
  const nav = useNavigate();
  const [selectedMood, setSelectedMood] = useState("");

  const moods = ["Casual 😌", "Elegant ✨", "Bold 🔥", "Soft 🌸", "Cute 🎀"];

  const toggleMood = (mood) => {
    if (selectedMood === mood) {
      setSelectedMood("");
    } else {
      setSelectedMood(mood); 
    }
  };

  const handleNext = () => {
 
    console.log("Selected Mood:", selectedMood);
    nav("/hair-type"); 
  };

  return (
    <div className="page">
      <h2>Select Your Mood</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => toggleMood(mood)}
            style={{
              background: selectedMood === mood ? "#ffb6c1" : "#eee",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {mood}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedMood}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: selectedMood ? "#4caf50" : "#ccc",
          color: "#fff",
          cursor: selectedMood ? "pointer" : "not-allowed",
        }}
      >
        Next
      </button>
    </div>
  );
}

export default MoodSelection;
