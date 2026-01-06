import React from "react";
import { useNavigate } from "react-router-dom";
import outfit1 from "../assets/out1.png";
import outfit2 from "../assets/out2.png";
import outfit3 from "../assets/out3.png";
import "./wardrobe.css";

function Wardrobe({ gender }) {
  const navigate = useNavigate();

  const images = [outfit1, outfit2, outfit3];

  return (
    <div className={`wardrobe-page ${gender === "male" ? "male" : ""}`}>
      <div className="wardrobe-card">
        <h2>👚 Wardrobe</h2>
        <p>Manage your outfits</p>

        <div className="wardrobe-grid">
          {images.map((img, index) => (
            <div key={index} className="wardrobe-item">
              <img src={img} alt={`outfit-${index}`} />
            </div>
          ))}
        </div>

        <div style={{ height: "20px" }} />

        <button className="wardrobe-btn add-btn" onClick={() => navigate("/add-outfit")}>
          + Add Outfit
        </button>

        <div style={{ height: "15px" }} />

        <button className="wardrobe-btn next-btn" onClick={() => navigate("/colors")}>
          Next →
        </button>

        <div style={{ height: "12px" }} />

        <button className="wardrobe-btn skip-btn" onClick={() => navigate("/colors")}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default Wardrobe;
