import express from "express";
const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const mockImages = [
      "https://i.imgur.com/8Km9tLL.png",
      "https://i.imgur.com/5M2a1bU.png",
      "https://i.imgur.com/IdB2HhR.png",
    ];

    const randomIndex = Math.floor(Math.random() * mockImages.length);
    const imageUrl = mockImages[randomIndex];

    setTimeout(() => {
      res.json({ outfitImage: imageUrl }); 
    }, 1000);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate outfit image" });
  }
});

export default router;
