// backend/config/db.js
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const testDB = async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  }
};

export default db;
