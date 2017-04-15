var express = require('express');
var path = require('path');
var server = require('http').createServer(app);

// Express
var app = express();

//Socket io
//var socket_io = require( "socket.io")(server);
var io = require('socket.io')(server);
app.io  = io;

//Routes
var index = require('./routes/index') (io);

// view engine setup
//app.set('views', path.join(__dirname+ '/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

// add routers
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
