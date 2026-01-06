import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.status(201).json({ message: "Message sent 💖" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
