var express = require('express');
var router = express.Router();
const mysqlConnection = require('mysql')

/* GET home page. */
router.get('/learners', (req, res) => {
  mysqlConnection.query('SELECT * FROM tbl_post', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

module.exports = router;
