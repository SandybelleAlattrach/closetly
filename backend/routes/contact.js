import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

/* POST /api/contact */
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const sql =
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    await pool.query(sql, [name, email, message]);

    res.json({ message: "Message sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
});

export default router;
