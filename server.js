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
    
    // Query to insert the user data
    const query = 'INSERT INTO client_data (fullname, mobile, email, msg, sub_date) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, number, email, msg, date], (err) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ message: 'Failed to save message' });
        } else {
            res.status(200).json({ message: 'Message saved successfully' });
        }
    });
});

// GET route for /admin to verify credentials and retrieve data
app.get('/admin', (req, res) => {
    const { user, password } = req.query;

    // Verify admin credentials
    if (user === 'admin' && password === '1234') {
        db.query('SELECT * FROM client_data', (err, rows) => {
            if (err) {
                console.error('Error retrieving messages:', err);
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
