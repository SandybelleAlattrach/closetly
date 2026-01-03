import React from "react";
import "./auth.css";

function AIOutfitGenerator() {
  return (
    <div className="auth-container">
      <h2>AI Outfit Generator</h2>
      <p>The AI will generate outfit suggestions based on your style and preferences.</p>

      <div className="loading-box">
        <p>✨ Generating outfit with AI...</p>
      </div>
    </div>
  );
}

export default AIOutfitGenerator;
