// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Adjust CORS settings here
app.use(cors({
  origin: "http://localhost:3003"  // Replace with the exact origin
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', employeeRoutes);

module.exports = app;
