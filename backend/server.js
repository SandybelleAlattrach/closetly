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
 * - You can set CORS_ORIGINS as a comma-separated list in env (e.g. "https://a.com,https://b.com")
 * - If CORS_ORIGINS is not set, a reasonable default list is used.
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

// Allow '*' if explicitly set in env as a single character
const allowAll = allowedOrigins.length === 1 && allowedOrigins[0] === "*";

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowAll || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: origin ${origin} is not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
    credentials: false,
  })
);

// Ensure preflight requests work for all routes
app.options("*", cors());

/**
 * Middleware
 */
app.use(express.json({ limit: "5mb" })); // protect against huge bodies
app.use(express.urlencoded({ extended: true }));

/**
 * Basic health check
 */
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

/**
 * Mount API routes
 */
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

/**
 * Optionally mount user routes if the file exists and exports a default router.
 * This is done via dynamic import to avoid crashing if the module is missing or incompatible.
 */
try {
  // dynamic import allowed in ESM; this will succeed if routes/user.js exists and exports default
  const userModule = await import("./routes/user.js");
  if (userModule && userModule.default) {
    app.use("/api/users", userModule.default);
    console.log("✅ /api/users routes mounted");
  } else {
    console.log("ℹ️ /routes/user.js found but did not export a default router");
  }
} catch (err) {
  console.log("ℹ️ /api/users routes not mounted:", err.message);
}

/**
 * 404 handler for unknown API routes
 */
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

/**
 * Generic error handler — logs stack on server, returns safe message to client
 */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  if (!res.headersSent) {
    res.status(500).json({ message: "Server error" });
  } else {
    next(err);
  }
});

/**
 * Start server & graceful shutdown
 */
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
      // Close DB pool (mysql2's pool.end()) if available
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