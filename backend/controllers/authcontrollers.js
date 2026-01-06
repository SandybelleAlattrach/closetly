import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const user = req.body;

  if (!user.firstName || !user.lastName || !user.email || !user.password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const [result] = await db.execute(
      `INSERT INTO users
      (firstName,lastName,email,password,city,occasion,AI,gender,wardrobe,colors,mood,hairColor,hairType,makeup,skin,rating,age)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        user.firstName,
        user.lastName,
        user.email,
        hashedPassword,
        user.city || "",
        user.occasion || "",
        user.AI || "",
        user.gender || "",
        JSON.stringify(user.wardrobe || []),
        JSON.stringify(user.colors || []),
        user.mood || "",
        user.hairColor || "",
        user.hairType || "",
        user.makeup || "",
        user.skin || "",
        user.rating || "",
        user.age || "",
      ]
    );

    res.status(201).json({
      user: {
        id: result.insertId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
