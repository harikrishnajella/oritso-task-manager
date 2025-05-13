
const db = require('../config/db');

const Task = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  create: ({ title, description, dueDate, status }) => {
    return new Promise((resolve, reject) => {
      const stmt = `INSERT INTO tasks (title, description, dueDate, status) VALUES (?, ?, ?, ?)`;
      db.run(stmt, [title, description, dueDate, status || 'pending'], function (err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID });
      });
    });
  },

  update: (id, { title, description, dueDate, status }) => {
    return new Promise((resolve, reject) => {
      const stmt = `
        UPDATE tasks
        SET title = ?, description = ?, dueDate = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      db.run(stmt, [title, description, dueDate, status, id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  },

  search: (term) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks WHERE title LIKE ?', [`%${term}%`], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = Task;

