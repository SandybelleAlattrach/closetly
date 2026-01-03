import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/age", async (req, res) => {
  const { userId, age } = req.body;
  await User.findByIdAndUpdate(userId, { age });
  res.json({ success: true });
});

router.post("/occasion", async (req, res) => {
  const { userId, occasion } = req.body;
  await User.findByIdAndUpdate(userId, { occasion });
  res.json({ success: true });
});

export default router;
