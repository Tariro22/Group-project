const db = require("./postgres");

async function main() {
  try {
    const result = await db.query(`
      SELECT
        tc.table_name,
        tc.constraint_name,
        tc.constraint_type
      FROM information_schema.table_constraints tc
      WHERE tc.constraint_schema = 'studentsphere'
      ORDER BY tc.table_name, tc.constraint_type;
    `);

    console.log("\nDATABASE CONSTRAINTS:");
    console.table(result.rows);
    console.log("Total constraints:", result.rows.length);
  } catch (error) {
    console.error("Verification failed:", error.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

main();
