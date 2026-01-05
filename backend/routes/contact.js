import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message saved 💖" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
