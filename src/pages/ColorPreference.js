import React from "react";

function ColorPreference({ userInfo, setUserInfo, handleNext }) {
  const colors = ["❤️ Red", "🖤 Black", "🤍 White", "💙 Blue", "💗 Pink", "💚 Green"];

  const toggleColor = (c) => {
    let newColors = userInfo.colors || [];

    if (newColors.includes(c)) {
      newColors = newColors.filter(x => x !== c);
    } else {
      if (newColors.length === 3) return;
      newColors = [...newColors, c];
    }

    setUserInfo({ ...userInfo, colors: newColors });
  };

  const isMale = userInfo.gender === "male";

  return (
    <div className={`auth-container ${isMale ? "male-theme" : "female-theme"}`}>
      <h2>🎨 Colors You Prefer</h2>
      <p>Select 1 to 3 colors</p>

      <div className="colors-grid">
        {colors.map(c => {
          const isSelected = userInfo.colors?.includes(c);

          return (
            <button
              key={c}
              type="button"
              className={`color-btn ${isSelected ? "selected" : ""} ${isMale ? "male-btn" : "female-btn"}`}
              onClick={() => toggleColor(c)}
            >
              {c}
            </button>
          );
        })}
      </div>

      <button
        className="next-btn"
        disabled={!userInfo.colors || userInfo.colors.length === 0}
        onClick={handleNext}
      >
        Next →
      </button>
    </div>
  );
}

export default ColorPreference;
