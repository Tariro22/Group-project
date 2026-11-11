require('dotenv').config();

const db = require('./postgres');

async function inspect() {
  try {
    const users = await db.query(`
      SELECT id, full_name, university_id, role, status
      FROM users
      ORDER BY id;
    `);

    console.log('\nCURRENT USERS');
    console.table(users.rows);

    const counts = await db.query(`
      SELECT
        table_name,
        (xpath('/row/count/text()', query_to_xml(
          format('SELECT COUNT(*) AS count FROM studentsphere.%I', table_name),
          false, true, ''
        )))[1]::text::int AS total_records
      FROM information_schema.tables
      WHERE table_schema = 'studentsphere'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('\nTABLE RECORD COUNTS');
    console.table(counts.rows);

  } catch (error) {
    console.error(error.message);
  } finally {
    await db.pool.end();
  }
}

inspect();
