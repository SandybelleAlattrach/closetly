import db from "./db.js";

const initDB = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      resetPasswordToken VARCHAR(255),
      resetPasswordExpire BIGINT
    )
  `);
  console.log("Users table ready");
  process.exit();
};

initDB();
