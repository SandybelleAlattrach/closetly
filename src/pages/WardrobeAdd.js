
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./wardrobe.css";

function WardrobeAdd() {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState([]);

  const handleAddOutfit = (e) => {
    const files = Array.from(e.target.files);

    const newOutfits = files.map((file) => ({
      id: Date.now() + Math.random(),
      img: URL.createObjectURL(file),
      favorite: false,
    }));

    setOutfits((prev) => [...prev, ...newOutfits]);
  };

  const toggleFavorite = (id) => {
    setOutfits((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, favorite: !o.favorite } : o
      )
    );
  };

  const deleteOutfit = (id) => {
    setOutfits((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="wardrobe-page">
      <h2>👗 Add Your Wardrobe</h2>

      <label className="add-btn">
        ➕ Add Outfit
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddOutfit}
          hidden
        />
      </label>

      <div className="outfits-preview">
        {outfits.length === 0 && <p>No outfits added yet.</p>}

        {outfits.map((outfit) => (
          <div key={outfit.id} className="outfit-card">
            <img src={outfit.img} alt="outfit" />

            <div className="outfit-actions">
              <button
                className={`fav-btn ${outfit.favorite ? "active" : ""}`}
                onClick={() => toggleFavorite(outfit.id)}
              >
                ⭐
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteOutfit(outfit.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="next-btn" onClick={() => navigate("/wardrobe")}>
        ← Back to Wardrobe
      </button>
    </div>
  );
}

export default WardrobeAdd;
