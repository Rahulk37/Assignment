const db = require('../models/db');

exports.getEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.createEmployee = (req, res) => {
  const { name, position, department } = req.body;
  const query = 'INSERT INTO employees (name, position, department) VALUES (?, ?, ?)';
  db.query(query, [name, position, department], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Employee added');
  });
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, position, department } = req.body;
  const query = 'UPDATE employees SET name = ?, position = ?, department = ? WHERE id = ?';

  db.query(query, [name, position, department, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Employee updated');
  });
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Employee deleted');
  });
};
