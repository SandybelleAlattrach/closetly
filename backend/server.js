// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";
import db from "./config/db.js"; // ensures DB connection/test logs run

dotenv.config();

const app = express();

// whitelist specific origins or use '*' for public API
const allowedOrigins = [
  "https://sandybellealattrach.github.io",   // GitHub Pages origin
  "https://closetly-nstg.onrender.com",      // your render domain (if you call from same origin)
  "http://localhost:3000",
  "*", // you can remove "*" if you want strict whitelist
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl, mobile, server-to-server)
      if (!origin) return callback(null, true);
      // allow if origin is in whitelist or if you want to allow everything, set true
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: This origin is not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204,
  })
);

// ensure OPTIONS preflight is handled for all routes
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});