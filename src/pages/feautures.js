import React from 'react';

function Features() {
  const features = [
    "Organize personal wardrobes efficiently",
    "Plan and save daily outfits based on weather, occasion, and mood",
    "AI-based outfit suggestions",
    "Reduce decision fatigue with smart recommendations",
    "Track worn outfits to avoid repetition",
    "Reminders for laundry or unused clothes"
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <ul className="list-disc pl-5">
        {features.map((feature, index) => <li key={index}>{feature}</li>)}
      </ul>
    </div>
  );
}

export default Features;
