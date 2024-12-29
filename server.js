const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'aannkkiitt136', // Replace with your MySQL password
    database: 'todo_app',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API Endpoints

// Get all tasks
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) throw err;
        res.status(201).send({ id: result.insertId, name, description, completed: false });
    });
});

// Mark task as complete
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE tasks SET completed = TRUE WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Task marked as complete.' });
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Task deleted.' });
    });
});

// Start server
const PORT = 3000;
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});

