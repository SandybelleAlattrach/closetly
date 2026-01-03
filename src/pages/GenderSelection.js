import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gender.css";

function GenderSelection() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const options = [
    { label: "👔 Male", value: "male" },
    { label: "👗 Female", value: "female" },
  ];

  const handleNext = () => {
    if (!selected) return; // يمنع الانتقال إذا ما في اختيار
    localStorage.setItem("gender", selected);
    navigate("/wardrobe"); // يروح للصفحة التالية
  };

  return (
    <div className={`gender-page ${selected}`}>
      <div className="gender-card">
        <h2>Gender</h2>
        <p style={{ marginBottom: "15px" }}>Select your gender</p>

        <div className="gender-options">
          {options.map((o) => (
            <div
              key={o.value}
              className={`gender-option ${selected === o.value ? "active" : ""}`}
              onClick={() => setSelected(o.value)}
            >
              {o.label}
            </div>
          ))}
        </div>

        <button
          className="gender-next-btn"
          disabled={!selected}
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default GenderSelection;
