const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

const root = path.join(__dirname, '..', '..');
const db = new Database(process.env.DATABASE_PATH || path.join(root, 'club-events.sqlite3'));

function migrate() {
  db.pragma('foreign_keys = ON');
  const migrationDir = path.join(root, 'migrations');
  for (const file of fs.readdirSync(migrationDir).filter((name) => name.endsWith('.sql')).sort()) {
    db.exec(fs.readFileSync(path.join(migrationDir, file), 'utf8'));
  }
}

module.exports = { db, migrate };
