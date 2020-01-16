var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const method = require('./methods')
const mysqlConnection = require('./dbconfig')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

mysqlConnection.connect((err) => {
  if (!err)
    console.log('Connection Established Successfully');
  else
    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api', indexRouter);
// app.use('/users', usersRouter);

const tbl = 'tbl_post'

app.get('/learners', (req, res) => {
  mysqlConnection.query(method.selectAll(tbl), (err, rows, fields) => {
    if (!err)
      res.status(200).json({
        data: rows
      });
    else
      res.status(500).json(err)
    console.log(err);
  })
});

app.get('/learners/:id', (req, res) => {
  mysqlConnection.query(method.selectId(tbl, 'id = ?'), [req.params.id], (err, row, fields) => {
    if (!err)
      res.status(200).json(row);
    else
      res.status(500).json(err)
    console.log(err);
  })
});

app.post('/learners', (req, res) => {
  let contain = req.body;
  const sql = method.add(tbl,['name','body'])
  mysqlConnection.query(sql, [contain.name, contain.body], (err, rows, fields) => {
    if (!err) {
      res.status(201).json({
        message: 'Hello world'
      })
      console.log(rows)
    }
    else {
      res.status(500).json(err)
      console.log(err);
    }
  })
});

app.put('/learners/:id', (req, res) => {
  const id = req.params.id
  let contain = req.body;
  var sql = `UPDATE tbl_post SET name = ?, body = ? WHERE id = ?`;
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

app.delete('/learners/:id', (req, res) => {
  const id = req.params.id
  mysqlConnection.query('DELETE FROM tbl_post WHERE id = ?', [id], (err, rows, fields) => {
    if (!err)
      res.status(200).json({
        message: 'deleted/removed successfully'
      })
    else
      res.status(500).json(err)
      console.log(err);
  })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
