import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDB } from "./config/db.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* 🔹 Test route */
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

/* 🔹 Routes */
app.use("/api/contact", contactRoutes);

/* 🔹 Start server AFTER DB connection */
const PORT = process.env.PORT || 10000;

testDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("🚀 Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
