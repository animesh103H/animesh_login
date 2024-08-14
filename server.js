// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.query(checkUserQuery, [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.status(409).json({ success: false, message: 'User already exists' });
        } else {
            db.query(insertUserQuery, [username, password], (err, results) => {
                if (err) throw err;

                res.status(201).json({ success: true });
            });
        }
    });
});

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the home page
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
