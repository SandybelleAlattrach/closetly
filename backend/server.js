import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 10000;

testDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 Server running on port", PORT);
  });
});
