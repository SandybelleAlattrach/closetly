import React, { useState } from "react";

function SelectionPage({ onNext }) {
  const [changes, setChanges] = useState({
    hair: false,
    makeup: false,
    top: false,
    bottom: false,
    accessory: false,
  });

  const handleToggle = (item) => {
    setChanges({ ...changes, [item]: !changes[item] });
  };

  const handleNext = () => {
    onNext(changes);
  };

  return (
    <div className="selection-page">
      <h2>Select what you want to change:</h2>
      {Object.keys(changes).map((item) => (
        <div key={item}>
          <label>
            <input
              type="checkbox"
              checked={changes[item]}
              onChange={() => handleToggle(item)}
            />
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </label>
        </div>
      ))}
      <button style={{ marginTop: "20px" }} onClick={handleNext}>
        Apply Changes
      </button>
    </div>
  );
}

export default SelectionPage;
