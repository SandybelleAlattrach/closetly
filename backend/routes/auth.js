import express from "express";
import { signup, login, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// Password reset
router.post("/forgot", forgotPassword);
router.put("/reset/:token", resetPassword);

export default router;
