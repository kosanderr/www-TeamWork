var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var wiki = require('./models/wiki.js');
var index = require('./routes/index');
var users = require('./routes/users');
var catalog = require('./routes/catalog');  //Import routes for "catalog" area of site


var app = express();


// Seuraavat rivit on lisättävä app.js -tiedostoon
 
// NOTE! Remember to import mongoose
var mongoose = require('mongoose');
 
 
//NOTE! Remember to create a database connection
var dev_db_url = 'mongodb://jaska:jokunen@ds213688.mlab.com:13688/wwwproject';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/wiki', wiki);
app.use('/', index);
app.use('/users', users);
app.use('/catalog', catalog);  // Add catalog routes to middleware chain.



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
