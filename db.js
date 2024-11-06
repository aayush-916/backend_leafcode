const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db'); // Persistent storage in a file

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            number TEXT,
            email TEXT,
            message TEXT,
            date TEXT
        )
    `);
});

module.exports = db;
