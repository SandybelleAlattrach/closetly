import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Occasion() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const options = [
    { label: "University 🎓", value: "university" },
    { label: "Work 💼", value: "work" },
    { label: "Wedding 💍", value: "wedding" },
    { label: "Party 🎉", value: "party" },
    { label: "Casual 👕", value: "casual" },
    { label: "Formal 🖤", value: "formal" },
    { label: "Gym 🏋️", value: "gym" },
    { label: "Other ✨", value: "other" },
  ];

  const handleNext = () => {
    if (!selected) {
      alert("Please select an occasion");
      return;
    }

 
    localStorage.setItem("occasion", selected);

    
    navigate("/ai-decision");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Select Occasion</h2>

        <div className="options-grid">
          {options.map((o) => (
            <div
              key={o.value}
              className={`option-card ${
                selected === o.value ? "active" : ""
              }`}
              onClick={() => setSelected(o.value)}
            >
              {o.label}
            </div>
          ))}
        </div>

        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!selected}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Occasion;
