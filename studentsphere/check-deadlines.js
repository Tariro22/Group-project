const db = require("./postgres");

async function main() {
  try {
    const result = await db.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'studentsphere'
        AND table_name = 'recommendations'
        AND column_name = 'deadline'
    `);

    console.log("DEADLINE COLUMN:");
    console.table(result.rows);

    const values = await db.query(`
      SELECT DISTINCT deadline
      FROM recommendations
      WHERE deadline IS NOT NULL
      LIMIT 20
    `);

    console.log("STORED DEADLINES:");
    console.table(values.rows);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
}

main();
