// models/userModel.js
const db = require('../config/db');

// Method to add a new user (signup)
const addUser = (userData, callback) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.execute(query, [userData.username, userData.email, userData.password], callback);
};

// Method to find a user by email (login)
const findUserByEmail = (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.execute(query, [email], callback);
};

module.exports = {
    addUser,
    findUserByEmail,
};
