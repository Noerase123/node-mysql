const mysqlConnection = require('../dbconfig')
const method = require('../methods/methods')
const model = require('../models/models/commentModel')

module.exports.selectAll = (req, res) => {
    mysqlConnection.query(method.selectAll(model.table), (err, rows, fields) => {
          if (!err)
              res.status(200).json({
                  data: rows
              });
          else
              res.status(500).json(err);
          console.log(err);
      })
}

module.exports.selectById = (req, res) => {
    const id = req.params.id
    if (id === null) {
        res.status(404).json({
            message: 'Data Not found'
        })
    } 
    else {
      mysqlConnection.query(method.selectId(model.table, {comment_id: '?'}), [id], (err, row, fields) => {
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
}

module.exports.addComment = (req, res) => {
    let contain = req.body;
    if (Number.isNaN(contain.postID)) {
        
      const col = {
          postID: '?',
          comment: '?'
      }
      const sql = method.add(model.table,col)
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
  
}

module.exports.updateComment = (req, res) => {
    const id = req.params.id
    if (id === null) {
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
  var sql = method.update(model.table, col, {comment_id: '?'});
    mysqlConnection.query(sql, [contain.postID, contain.comment, id], (err, rows, fields) => {
      if (!err)
        res.status(200).json({
          message: 'updated successfully'
        })
      else
        res.status(500).json(err)
        console.log(err);
    })
}

module.exports.deleteComment = (req, res) => {
    const id = req.params.id
    if (id === '') {
        res.status(404).json({
            message: 'Data Not found'
        })
    }
  //   const sql = 'DELETE FROM tbl_post WHERE id = ?'
    const sql = method.delete(model.table, {comment_id: '?'})
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
      if (!err)
        res.status(200).json({
          message: 'deleted/removed successfully'
        })
      else
        res.status(500).json(err)
        console.log(err);
    })
}