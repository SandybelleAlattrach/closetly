import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});
try {
  const conn = await db.getConnection();
  console.log("✅ MySQL connected (PUBLIC)");
  conn.release();
} catch (err) {
  console.error("❌ MySQL connection error:", err);
}
