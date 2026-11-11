require('dotenv').config();

const db = require('./postgres');

async function inspect() {
  try {
    const result = await db.query(`
      SELECT
        conrelid::regclass AS table_name,
        conname AS constraint_name,
        pg_get_constraintdef(oid) AS definition
      FROM pg_constraint
      WHERE connamespace = 'studentsphere'::regnamespace
      ORDER BY conrelid::regclass::text, conname;
    `);

    console.table(result.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    await db.pool.end();
  }
}

inspect();
