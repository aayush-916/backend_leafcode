// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST route to accept data from React
app.post('/submit', (req, res) => {
    const { name, number, email, msg } = req.body;
    const date = new Date().toISOString();

    db.run(
        `INSERT INTO messages (name, number, email, message, date) VALUES (?, ?, ?, ?, ?)`,
        [name, number, email, msg, date],
        function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to save message' });
            } else {
                res.status(200).json({ message: 'Message saved successfully' });
            }
        }
    );
});

// GET route for /admin to verify credentials and retrieve data
app.get('/admin', (req, res) => {
    const { user, password } = req.query;

    if (user === 'admin' && password === '1234') {
        db.all(`SELECT * FROM messages`, (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve messages' });
            } else {
                res.status(200).json(rows);
            }
        });
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
