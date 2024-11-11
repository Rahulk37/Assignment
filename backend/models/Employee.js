// models/Employee.js
const db = require('../config/db');

const Employee = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM employees', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  create({ name, email, position, department }) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO employees (name, email, position, department) VALUES (?, ?, ?, ?)',
        [name, email, position, department],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  update(id, { name, email, position, department }) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE employees SET name = ?, email = ?, position = ?, department = ? WHERE id = ?',
        [name, email, position, department, id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Employee;
