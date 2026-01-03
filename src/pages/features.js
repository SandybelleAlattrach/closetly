import React from 'react';
import './features.css'; 

function Features() {
  const features = [
  "Organize personal wardrobes efficiently 👗💖",
  "Plan and save daily outfits based on weather, occasion, and mood 🌸✨",
  "AI-based outfit suggestions 🤖👠",
  "Reduce decision fatigue with smart recommendations ✨🧠",
  "Track worn outfits to avoid repetition 👚💕",
  "Reminders for laundry or unused clothes 🧺💫"
];


  return (
    <div className="features-container">
      <h1 className="features-title">Features</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
