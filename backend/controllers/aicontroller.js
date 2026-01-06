// backend/controllers/aicontroller.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateOutfit = async (req, res) => {
  try {
    const { style, occasion, color } = req.body;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `A full outfit in ${color} color for ${occasion}, style ${style}, no human face, no body, just clothing on mannequin or flat lay`,
      size: "512x512",
    });

    const imageUrl = response.data[0].url;

    // هنا نرجع الـ URL تحت اسم outfitImage
    res.json({ outfitImage: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
