const mysql = require('mysql2');

// MySQL Database connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com', 
    user: 'sql12756378',
    Port: 3306,  
    password: 'npXzapDTQr',      
    database: 'sql12756378' 
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;
