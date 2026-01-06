import React, { useEffect, useState } from "react";

function AIPreview() {
  const [outfitImage, setOutfitImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfit = async () => {
      try {
        const res = await fetch("http://localhost:10001/api/ai/generate", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ style: "elegant", occasion: "party", color: "red" }),
        });
        const data = await res.json();

        setTimeout(() => {
          setOutfitImage(data.outfitImage); 
          setLoading(false);
        }, 3000);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOutfit();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>AI Outfit Preview</h2>

      {loading ? (
        <p>Loading outfit image...</p>
      ) : outfitImage ? (
        <div>
          <img
            src={outfitImage}
            alt="Generated Outfit"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      ) : (
        <p>Failed to load outfit</p>
      )}
    </div>
  );
}

export default AIPreview;
