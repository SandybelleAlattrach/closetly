import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  console.log("📩 Contact message:", { name, email, message });

  res.json({ message: "Message received successfully" });
});

export default router;
