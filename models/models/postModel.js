const mysqlConnection = require('../../dbconfig')
const method = require('../../methods/methods')

const tbl = 'tbl_post'

const column = {
  table: tbl,
  id: 'post_id',
  name: 'name VARCHAR(255)',
  body: 'body VARCHAR(255)'
}
// const sql = "CREATE TABLE tbl_body (name VARCHAR(255), address VARCHAR(255))";
const sql = method.createTable(column.table,
  [
    column.name,
    column.body
  ], 
  column.id);

mysqlConnection.query(sql, (err, result) => {
  if (err) throw err;
  console.log(`${column.table} created`);
});

module.exports.connect = mysqlConnection

module.exports.table = tbl