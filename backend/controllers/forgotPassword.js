import crypto from "crypto";
import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 
  await user.save();

  const resetURL = `http://localhost:3000/reset/${resetToken}`;

  console.log("Reset URL:", resetURL);

  res.status(200).json({ message: "Reset link sent", resetURL });
};
