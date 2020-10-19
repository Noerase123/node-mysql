var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mysqlConnection = require('./dbconfig')

const {
  postModel, 
  commentModel, 
  roomModel 
} = require('./models/apiModels')

const apiRouter = require('./routes/api');

var app = express();

mysqlConnection.connect(err => {
  if (!err) {
    console.log('Connection Established Successfully');

    app.use(postModel.connect)
    app.use(commentModel.connect)
    app.use(roomModel.connect)

  }
  else {
    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
  }
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
// app.use('/users', usersRouter);

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
