require('dotenv').config();
const db = require('./postgres');

async function inspect() {
  const result = await db.query(`
    SELECT table_name, column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'studentsphere'
    ORDER BY table_name, ordinal_position
  `);

  let current = '';

  for (const row of result.rows) {
    if (row.table_name !== current) {
      current = row.table_name;
      console.log('\nTABLE: ' + current);
    }
    console.log(`  ${row.column_name} | ${row.data_type} | nullable: ${row.is_nullable}`);
  }

  await db.pool.end();
}

inspect().catch(async error => {
  console.error(error);
  await db.pool.end();
  process.exit(1);
});
