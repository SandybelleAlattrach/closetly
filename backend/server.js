import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";
import { testDB } from "./config/db.js";

dotenv.config();

const app = express();

/* ✅ CORS مضبوط للـ GitHub Pages */
app.use(
  cors({
    origin: [
      "https://sandybellealattrach.github.io",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

/* test route */
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

/* routes */
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 10000;

/* start server after DB check */
testDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("🚀 Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
