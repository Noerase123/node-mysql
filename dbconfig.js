const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'learner',
    multipleStatements: true
  });

module.exports = mysqlConnection