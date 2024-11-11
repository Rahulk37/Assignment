// utils/generateToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = generateToken;
