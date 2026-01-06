import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const sql =
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    await db.execute(sql, [name, email, message]);

    res.status(200).json({ message: "Message sent!" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ message: "DB error" });
  }
});

export default router;
