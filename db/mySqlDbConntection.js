const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',  //define host name
    user: 'root', // usename 
    password: 'Chauhan@#$1234',  //password
    database: 'nodejsmysql',  // databsename
});

module.exports = connection.promise();
