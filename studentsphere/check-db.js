const db = require("./postgres");

async function main() {
  try {
    const result = await db.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = $1
       AND table_type = $2
       ORDER BY table_name`,
      ["studentsphere", "BASE TABLE"]
    );

    console.log("DATABASE TABLES:");
    result.rows.forEach(row => console.log(row.table_name));
  } catch (error) {
    console.error("Database check failed:", error.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

main();
