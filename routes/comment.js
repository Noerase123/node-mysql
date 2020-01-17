var express = require('express');
var router = express.Router();
const mysqlConnection = require('../dbconfig')
const method = require('../methods')

const tbl = 'tbl_comment'

router.get('/', (req, res) => {
  mysqlConnection.query(method.selectAll(tbl), (err, rows, fields) => {
        if (!err)
            res.status(200).json({
                data: rows
            });
        else
            res.status(500).json(err);
        console.log(err);
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  if (id == null) {
      res.status(404).json({
          message: 'Data Not found'
      })
  } 
  else {
    mysqlConnection.query(method.selectId(tbl, {comment_id: '?'}), [id], (err, row, fields) => {
        if (!err) {
            res.status(200).json(row[0]);
            console.log(row[0])
        }
        else {
            res.status(500).json(err)
            console.log(err);
        }
    })
  }
});

router.post('/', (req, res) => {
  let contain = req.body;
  if (Number.isNaN(contain.postID)) {
      
    const col = {
        postID: '?',
        comment: '?'
    }
    const sql = method.add(tbl,col)
    mysqlConnection.query(sql, [contain.postID, contain.comment], (err, rows, fields) => {
        if (!err) {
        res.status(201).json({
            message: 'comment added successfully'
        })
        }
        else {
        res.status(500).json(err)
        console.log(err);
        }
    })
  }
  else {
    res.status(500).json({
        message: `you cannot convert ${typeof contain.postID} to Integer`
    })
    }

});

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (id === '') {
      res.status(404).json({
          message: 'Data Not found'
      })
  }
  const col = [
      'postID = ?',
      'comment = ?'
  ]
  let contain = req.body;
//   var sql = `UPDATE tbl_post SET name = ?, body = ? WHERE id = ?`;
var sql = method.update(tbl, col, {comment_id: '?'});
  mysqlConnection.query(sql, [contain.postID, contain.comment, id], (err, rows, fields) => {
    if (!err)
      res.status(200).json({
        message: 'updated successfully'
      })
    else
      res.status(500).json(err)
      console.log(err);
  })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  if (id === '') {
      res.status(404).json({
          message: 'Data Not found'
      })
  }
//   const sql = 'DELETE FROM tbl_post WHERE id = ?'
  const sql = method.delete(tbl, {comment_id: '?'})
  mysqlConnection.query(sql, [id], (err, rows, fields) => {
    if (!err)
      res.status(200).json({
        message: 'deleted/removed successfully'
      })
    else
      res.status(500).json(err)
      console.log(err);
  })
});

module.exports = router
