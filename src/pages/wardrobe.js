// src/pages/Wardrobe.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import outfit1 from "../assets/out1.png";
import outfit2 from "../assets/out2.png";
import outfit3 from "../assets/out3.png";
import "./wardrobe.css"; // ملف CSS جديد خاص بالWardrobe

function Wardrobe() {
  const navigate = useNavigate();
  const [images, setImages] = useState([outfit1, outfit2, outfit3]);
  const [gender, setGender] = useState(""); // تخزين الجنس

  // نقرا الجنس من localStorage
  useEffect(() => {
    const g = localStorage.getItem("gender");
    if (g) setGender(g);
  }, []);

  const handleAddOutfit = () => {
    navigate("/add-outfit"); 
  };

  const handleNext = () => {
    navigate("/colors"); 
  };

  const handleSkip = () => {
    navigate("/colors");
  };

  return (
    <div className={`wardrobe-page ${gender}`}>
      <div className="wardrobe-card">
        <h2> 👚 Wardrobe</h2>
        <p>Manage your outfits</p>

        <div className="wardrobe-grid">
          {images.map((img, index) => (
            <div key={index} className="wardrobe-item">
              <img src={img} alt={`outfit-${index}`} />
            </div>
          ))}
        </div>

        <div style={{ height: "20px" }} />
        <button className="wardrobe-btn add-btn" onClick={handleAddOutfit}>
          + Add Outfit
        </button>

        <div style={{ height: "15px" }} />
        <button className="wardrobe-btn next-btn" onClick={handleNext}>
          Next →
        </button>

        <div style={{ height: "12px" }} />
        <button className="wardrobe-btn skip-btn" onClick={handleSkip}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default Wardrobe;
