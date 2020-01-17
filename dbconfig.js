const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_mytown',
    multipleStatements: true
  });

module.exports = mysqlConnection