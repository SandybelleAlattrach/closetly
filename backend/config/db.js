import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Prefer parsing a full connection URL if available (Railway provides MYSQL_URL / MYSQL_PUBLIC_URL)
const connUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;

let host, user, password, database, port;

if (connUrl) {
  try {
    const url = new URL(connUrl);
    host = url.hostname;
    port = url.port ? Number(url.port) : undefined;
    user = url.username;
    password = url.password;
    database = url.pathname ? url.pathname.replace(/^\//, "") : undefined;
  } catch (err) {
    console.error("Failed to parse DB connection URL:", err);
  }
}

// Fallbacks for various env var names used by Render/Railway etc.
host = host || process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || process.env.DB_HOSTNAME;
user = user || process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER;
password = password || process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD;
database = database || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || process.env.DATABASE;
port = port || (process.env.MYSQLPORT ? Number(process.env.MYSQLPORT) : undefined) || (process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined);

// Basic sanity defaults (do not hardcode secrets here in production)
const poolConfig = {
  host: host || "localhost",
  user: user || "root",
  password: password || "",
  database: database || "railway",
  waitForConnections: true,
  connectionLimit: 10,
};

if (port) poolConfig.port = port;

const db = mysql.createPool(poolConfig);

async function testConnection() {
  try {
    const conn = await db.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL pool connected:", {
      host: poolConfig.host,
      database: poolConfig.database,
      port: poolConfig.port,
      user: poolConfig.user,
    });
  } catch (err) {
    console.error("❌ MySQL connection failed:", err && err.message ? err.message : err);
  }
}

// Test connection immediately (logs will show in your service)
testConnection();

export default db;