require('dotenv').config();

const db = require('./postgres');

async function inspect() {
  try {
    const result = await db.query(`
      SELECT
        tc.table_name,
        tc.constraint_name,
        tc.constraint_type,
        kcu.column_name,
        ccu.table_name AS foreign_table,
        ccu.column_name AS foreign_column
      FROM information_schema.table_constraints tc
      LEFT JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.constraint_schema = kcu.constraint_schema
      LEFT JOIN information_schema.constraint_column_usage ccu
        ON tc.constraint_name = ccu.constraint_name
        AND tc.constraint_schema = ccu.constraint_schema
      WHERE tc.constraint_schema = 'studentsphere'
      ORDER BY tc.table_name, tc.constraint_type;
    `);

    console.table(result.rows);
  } catch (error) {
    console.error(error.message);
  } finally {
    await db.pool.end();
  }
}

inspect();
