
import React, { useEffect, useState } from "react";
import "./Outfit.css";

function OutfitSuggestion() {
  const [occasion, setOccasion] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [pickedImages, setPickedImages] = useState([]);
  const [wardrobeImages, setWardrobeImages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wardrobeImages") || "[]");
    setWardrobeImages(saved);
  }, []);

  const generateOutfit = () => {
    
    const favorites = JSON.parse(localStorage.getItem("wardrobeFavorites") || "[]");
    let pool = [...wardrobeImages];

    
    if (favorites.length > 0) {
      const favItems = pool.filter(p => favorites.includes(p.id));
      pool = [...pool, ...favItems, ...favItems]; 
    }

    const shuffled = pool.sort(() => 0.5 - Math.random());
    const pickCount = Math.min(3, shuffled.length);
    const picks = shuffled.slice(0, pickCount);

    setPickedImages(picks);

    const baseOptions = {
      casual: "Casual: comfy + cute — try pairing a pastel top with light jeans and comfy sneakers.",
      date: "Date Night: soft & romantic — a pastel satin dress with delicate jewelry.",
      work: "Work: smart & soft — a neutral blazer with chiffon blouse.",
      party: "Party: glam & sparkly — statement piece + subtle heels.",
      "": "Try different occasions to generate outfit ideas — we also use your uploaded clothes!"
    };

    let text = baseOptions[occasion || ""] || baseOptions[""];
    if (picks.length > 0) {
      text += " Based on your closet, we suggest:";

      // quick description from number of picks
      if (picks.length === 1) text += ` highlight this piece — ${picks[0].name}`;
      else if (picks.length === 2) text += ` mix ${picks[0].name} with ${picks[1].name}`;
      else if (picks.length === 3) text += ` combine ${picks[0].name}, ${picks[1].name} and ${picks[2].name}`;
    } else {
      text += " (No uploaded images — try adding clothes in Wardrobe.)";
    }

    setSuggestionText(text);
  };

  return (
    <div className="page-container">
      <div className="center" style={{ marginTop: 10 }}>
        <h2 className="pink-text">AI Outfit Suggestions 💖</h2>
        <p>Generate ready-made combos using your uploaded wardrobe.</p>

        <div style={{ marginTop: 18 }}>
          <select className="select-input" value={occasion} onChange={(e) => setOccasion(e.target.value)} style={{ padding: 12, borderRadius: 12, border: "1px solid #ffd5eb" }}>
            <option value="">Select Occasion</option>
            <option value="casual">Casual</option>
            <option value="date">Date Night</option>
            <option value="work">Work</option>
            <option value="party">Party</option>
          </select>

          <button className="cta-btn" onClick={generateOutfit} style={{ marginLeft: 12 }}>Generate Outfit</button>
        </div>
      </div>

      {suggestionText && (
        <div className="suggestion-box card" style={{ marginTop: 26 }}>
          <p style={{ margin: 0, color: "#ff4f9c", fontWeight: 600 }}>{suggestionText}</p>

          {pickedImages.length > 0 && (
            <div style={{ display: "flex", gap: 12, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
              {pickedImages.map(it => (
                <div key={it.id} style={{ width: 140, height: 170, borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 20px rgba(255,120,160,0.18)" }}>
                  <img src={it.dataUrl} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OutfitSuggestion;
