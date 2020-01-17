const mysqlConnection = require('../dbconfig')
const method = require('../methods')

const column = {
  table: 'tbl_comment',
  id: 'comment_id',
  postID: 'postID INT(20)',
  comment: 'comment VARCHAR(255)'
}
// const sql = "CREATE TABLE tbl_comment (postID INT(20), comment VARCHAR(255))";
const sql = method.createTable(column.table, 
  [
      column.postID, 
      column.comment
  ], 
  column.id);

mysqlConnection.query(sql, (err, result) => {
if (err) throw err;
  console.log(`${column.table} created`);
});

module.exports = mysqlConnection