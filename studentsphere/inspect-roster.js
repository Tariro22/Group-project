const db = require("./postgres");

async function main() {
  try {
    const result = await db.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'studentsphere'
        AND table_name = 'student_roster'
      ORDER BY ordinal_position
    `);

    console.table(result.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    await db.pool.end();
  }
}

main();
