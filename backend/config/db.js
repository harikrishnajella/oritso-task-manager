const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define database path
const dbPath = path.resolve(__dirname, '../tasks.db');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to the SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database at:', dbPath);
  }
});

// Initialize table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      status TEXT CHECK(status IN ('Pending', 'In-progress', 'Completed')) DEFAULT 'Pending',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating tasks table:', err.message);
    } else {
      console.log('Tasks table is ready');
    }
  });
});

module.exports = db;
