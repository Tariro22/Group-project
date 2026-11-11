const db = require("./postgres");

async function main() {
  try {
    const result = await db.query(`
      SELECT
        tc.table_name,
        kcu.column_name,
        ccu.table_name AS foreign_table,
        ccu.column_name AS foreign_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.constraint_schema = kcu.constraint_schema
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.constraint_schema = tc.constraint_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.constraint_schema = 'studentsphere'
      ORDER BY tc.table_name, kcu.column_name
    `);

    console.log("\nPOSTGRESQL FOREIGN KEY RELATIONSHIPS:");
    console.table(result.rows);
    console.log("Total foreign keys:", result.rows.length);
  } catch (error) {
    console.error("Verification failed:", error.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

main();
