const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_node_mysql',
    multipleStatements: true
  });

module.exports = mysqlConnection