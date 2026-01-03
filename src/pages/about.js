import React, { useState, useEffect } from "react";
import "./about.css";
function About() {
  const sentences = [
    "Style isn’t just what you wear — it’s the story you tell without saying a word.",
    "Create it. Own it. Shine in it ✨",
    "Mix, match, and sparkle every day 💖",
    "Closetly helps you organize your wardrobe and feel fabulous!",
    "Fashion is fun, feminine, and uniquely YOU 🌸",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sentences.length);
        setFadeIn(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      <div className="white-card">
        <h1 className="card-title">About Closetly</h1>
        <p className={`card-text ${fadeIn ? "fade-in" : "fade-out"}`}>
          {sentences[currentIndex]}
        </p>
        <p className="card-subtitle">✨ Cute, fun, and feminine vibes ✨</p>
      </div>
    </div>
  );
}

export default About;
