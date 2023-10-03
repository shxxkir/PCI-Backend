const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
});
  
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;