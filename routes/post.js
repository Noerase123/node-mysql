var express = require('express');
var router = express.Router();
const mysqlConnection = require('../dbconfig')
const method = require('../methods/methods')

const tbl = 'tbl_post'

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
    mysqlConnection.query(method.selectId(tbl, {post_id: '?'}), [id], (err, row, fields) => {
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
  const col = {
      name: '?',
      body: '?'
  }
  const sql = method.add(tbl,col)
  mysqlConnection.query(sql, [contain.name, contain.body], (err, rows, fields) => {
    if (!err) {
      res.status(201).json({
        message: 'post added successfully'
      })
    }
    else {
      res.status(500).json(err)
      console.log(err);
    }
  })
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (id === '') {
      res.status(404).json({
          message: 'Data Not found'
      })
  }
  const col = [
      'name = ?',
      'body = ?'
  ]
  let contain = req.body;
//   var sql = `UPDATE tbl_post SET name = ?, body = ? WHERE id = ?`;
var sql = method.update(tbl, col, {post_id: '?'});
  mysqlConnection.query(sql, [contain.name, contain.body, id], (err, rows, fields) => {
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
  const sql = method.delete(tbl, {post_id: '?'})
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
