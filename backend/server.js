import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js"; // triggers connection test/logging
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

/**
 * CORS configuration
 */
const envOrigins = process.env.CORS_ORIGINS;
const defaultOrigins = [
  "https://sandybellealattrach.github.io",
  "https://closetly-nstg.onrender.com",
  "http://localhost:3000",
];

const allowedOrigins = envOrigins
  ? envOrigins.split(",").map((s) => s.trim()).filter(Boolean)
  : [...defaultOrigins];

const allowAll = allowedOrigins.length === 1 && allowedOrigins[0] === "*";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowAll || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} is not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
    credentials: false,
  })
);

app.options("*", cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

/**
 * Try to dynamically mount /api/users if available.
 * Using import().then() keeps us from using top-level await.
 */
import("./routes/user.js")
  .then((userModule) => {
    if (userModule && userModule.default) {
      app.use("/api/users", userModule.default);
      console.log("✅ /api/users routes mounted");
    } else {
      console.log("ℹ️ /routes/user.js found but did not export a default router");
    }
  })
  .catch((err) => {
    // It's okay if the file is missing; just log the reason.
    console.log("ℹ️ /api/users routes not mounted:", err && err.message ? err.message : err);
  });

app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  if (!res.headersSent) {
    res.status(500).json({ message: "Server error" });
  } else {
    next(err);
  }
});

const PORT = Number(process.env.PORT) || 10000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("CORS allowed origins:", allowAll ? ["*"] : allowedOrigins);
});

async function shutdown(signal) {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  server.close(async (err) => {
    if (err) {
      console.error("Error closing server:", err);
      process.exit(1);
    }
    try {
      if (db && typeof db.end === "function") {
        await db.end();
        console.log("✅ DB pool closed");
      }
    } catch (e) {
      console.error("Error closing DB pool:", e);
    }
    console.log("Shutdown complete");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));