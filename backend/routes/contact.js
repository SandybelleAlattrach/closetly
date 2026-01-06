import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    console.log("📩 New contact message:");
    console.log({ name, email, message });

    res.status(200).json({ success: true, message: "Message received" });
  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
