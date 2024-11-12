// controllers/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Signup controller
exports.signup = (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        const userData = { username, email, password: hashedPassword };

        userModel.addUser(userData, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error adding user to database' });
            res.status(201).json({ message: 'User signed up successfully' });
        });
    });
};

// Login controller
exports.login = (req, res) => {
    const { email, password } = req.body;

    userModel.findUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords' });
            if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

            res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
        });
    });
};
