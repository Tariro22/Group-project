require('dotenv').config();

const db = require('./postgres');

async function inspect() {
  try {
    const result = await db.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'studentsphere'
      ORDER BY table_name, ordinal_position
    `);

    console.table(result.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    await db.pool.end();
  }
}

inspect();
