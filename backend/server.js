// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";
import { testDB } from "./config/db.js";

dotenv.config();

const app = express();

/* CORS */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 10000;

testDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
