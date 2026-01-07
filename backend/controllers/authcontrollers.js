import db from "../config/db.js";
import bcrypt from "bcryptjs";

/**
 * Signup: expects user info in req.body (email, password, firstName, lastName, ...)
 */
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      city,
      occasion,
      AI,
      gender,
      wardrobe,
      colors,
      mood,
      hairColor,
      hairType,
      makeup,
      skin,
      rating,
      age,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check existing user
    const [existing] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Store JSON columns as strings
    const wardrobeJson = wardrobe ? JSON.stringify(wardrobe) : JSON.stringify([]);
    const colorsJson = colors ? JSON.stringify(colors) : JSON.stringify([]);

    const [result] = await db.execute(
      `INSERT INTO users 
        (first_name, last_name, email, password_hash, city, occasion, ai, gender, wardrobe, colors, mood, hair_color, hair_type, makeup, skin, rating, age)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName || null,
        lastName || null,
        email,
        passwordHash,
        city || null,
        occasion || null,
        AI || null,
        gender || null,
        wardrobeJson,
        colorsJson,
        mood || null,
        hairColor || null,
        hairType || null,
        makeup || null,
        skin || null,
        rating || null,
        age || null,
      ]
    );

    const insertedId = result.insertId;

    // Return created user (exclude password)
    const [rows] = await db.execute(
      "SELECT id, first_name AS firstName, last_name AS lastName, email, city, occasion, ai, gender, wardrobe, colors, mood, hair_color AS hairColor, hair_type AS hairType, makeup, skin, rating, age, created_at AS createdAt FROM users WHERE id = ?",
      [insertedId]
    );

    return res.status(201).json({ user: rows[0] });
  } catch (err) {
    console.error("AUTH SIGNUP ERR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Login: expects { email, password } in req.body
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const [rows] = await db.execute(
      "SELECT id, first_name AS firstName, last_name AS lastName, email, password_hash FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    // Remove password_hash before returning
    delete user.password_hash;

    return res.json({ user });
  } catch (err) {
    console.error("AUTH LOGIN ERR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};