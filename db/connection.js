const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'local',
    // Your MySQL password
    password: 'senha',
    database: 'employee_tracker',
  },
  console.log('Connected to employee_tracker database.')
);

module.exports = db;
