import { db } from "../config/db.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const sql =
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
    await db.query(sql, [name, email, message]);

    res.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
