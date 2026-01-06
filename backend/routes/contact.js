import express from "express";
import { db } from "../server.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    console.log("INSERT RESULT:", result);

    res.status(201).json({ message: "Message sent!" });
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
