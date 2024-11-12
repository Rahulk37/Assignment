// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Make sure the path is correct

// Get all employees
router.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

// Get employee by ID
router.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(results[0]);
    });
});

// Create a new employee
router.post('/employees', (req, res) => {
    const { firstName, lastName, emailId, position, department } = req.body;

    // Check for missing fields
    if (!firstName || !lastName || !emailId || !position || !department) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(
        'INSERT INTO employees (firstName, lastName, emailId, position, department) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, emailId, position, department],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database insertion error' });
            }
            res.status(201).json({
                id: results.insertId,
                firstName,
                lastName,
                emailId,
                position,
                department
            });
        }
    );
});

// Update an employee
router.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, emailId, position, department } = req.body;

    // Check for missing fields
    if (!firstName || !lastName || !emailId || !position || !department) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(
        'UPDATE employees SET firstName = ?, lastName = ?, emailId = ?, position = ?, department = ? WHERE id = ?',
        [firstName, lastName, emailId, position, department, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database update error' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json({ id, firstName, lastName, emailId, position, department });
        }
    );
});

// Delete an employee
router.delete('/employees/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database deletion error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
});

module.exports = router;
