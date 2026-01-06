import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
});

/* just to test connection */
export async function testDB() {
  const conn = await pool.getConnection();
  console.log("✅ MySQL connected");
  conn.release();
}

