const sqlite3 = require('sqlite3').verbose();

// Make a database file if it doesn't exist
const db = new sqlite3.Database('./urls.db', (err) => {
    if (err) {
        console.error('Database error:', err.message);
    } else {
        console.log('Connected to database successfully');
    }
});

// Make a table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_code TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;