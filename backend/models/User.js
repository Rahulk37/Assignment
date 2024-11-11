// models/User.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async create({ email, username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
        [email, username, hashedPassword],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },
  
  async findByUsernameOrEmail(identifier) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [identifier, identifier],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  },
};

module.exports = User;
