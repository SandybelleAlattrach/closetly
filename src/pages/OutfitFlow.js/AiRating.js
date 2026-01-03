import React from "react";

function AiRating({ image, onRating }) {
  return (
    <div className="ai-rating-page">
      <h2>Do you like your outfit?</h2>
      {image && <img src={image} alt="Outfit Preview" width={300} />}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => onRating(true)}>Yes, I like it</button>
        <button onClick={() => onRating(false)}>No, I want to change</button>
      </div>
    </div>
  );
}

export default AiRating;
