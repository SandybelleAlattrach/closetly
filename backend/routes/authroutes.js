import express from "express";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/resetPassword.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;
