import express from "express";
import db from "../config/db.js";

const router = express.Router();

/**
 * GET /api/users/:id
 * Return user profile (excludes password)
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute(
      `SELECT id,
              first_name AS firstName,
              last_name AS lastName,
              email,
              city,
              occasion,
              ai,
              gender,
              wardrobe,
              colors,
              mood,
              hair_color AS hairColor,
              hair_type AS hairType,
              makeup,
              skin,
              rating,
              age,
              created_at AS createdAt
       FROM users WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error("USER GET ERR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/users/:id
 * Partial update of profile fields. Accepts JSON body with allowed fields.
 * wardrobe/colors should be arrays (will be stored as JSON).
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const allowed = [
    "firstName",
    "lastName",
    "city",
    "occasion",
    "AI",
    "gender",
    "wardrobe",
    "colors",
    "mood",
    "hairColor",
    "hairType",
    "makeup",
    "skin",
    "rating",
    "age",
  ];

  const updates = [];
  const values = [];

  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      let col = key;
      let val = req.body[key];
      if (key === "firstName") col = "first_name";
      if (key === "lastName") col = "last_name";
      if (key === "hairColor") col = "hair_color";
      if (key === "hairType") col = "hair_type";
      if (key === "AI") col = "ai";
      if (key === "wardrobe" || key === "colors") {
        val = JSON.stringify(val || []);
      }
      updates.push(`${col} = ?`);
      values.push(val);
    }
  }

  if (updates.length === 0) return res.status(400).json({ message: "No updatable fields provided" });

  values.push(id);

  try {
    await db.execute(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, values);
    return res.json({ success: true });
  } catch (err) {
    console.error("USER UPDATE ERR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;