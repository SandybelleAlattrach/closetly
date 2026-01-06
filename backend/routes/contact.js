import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "DB error" });
  }
});

export default router;
