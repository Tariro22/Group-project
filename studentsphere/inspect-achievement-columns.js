const db = require("./postgres");

async function inspect() {
  try {
    for (const table of [
      "achievements",
      "achievement_files",
      "achievement_verifications"
    ]) {
      const result = await db.query(
        `SELECT column_name, data_type, is_nullable
         FROM information_schema.columns
         WHERE table_schema = $1 AND table_name = $2
         ORDER BY ordinal_position`,
        ["studentsphere", table]
      );

      console.log("\nTABLE:", table);
      console.table(result.rows);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    await db.pool.end();
  }
}

inspect();
