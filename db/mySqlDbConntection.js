const mysql = require('mysql2');

// Replace these with your MySQL connection details
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Chauhan@#$1234',
    database: 'nodejsmysql',
});

module.exports = connection.promise();
