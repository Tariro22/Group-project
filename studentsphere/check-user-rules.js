const db = require("./postgres");

async function main() {
  try {
    const result = await db.query(`
      SELECT
        conname AS constraint_name,
        pg_get_constraintdef(oid) AS rule
      FROM pg_constraint
      WHERE conrelid = 'studentsphere.users'::regclass
        AND contype = 'c'
      ORDER BY conname;
    `);

    console.log("\nUSER ACCOUNT VALIDATION RULES:");
    console.table(result.rows);
  } catch (error) {
    console.error("Verification failed:", error.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

main();
