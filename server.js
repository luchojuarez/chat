var express = require('express');
var path = require('path');
var server = require('http').createServer(app);
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passportSocketIo = require("passport.socketio");
var favicon = require('serve-favicon');

var flash = require('connect-flash');
var socket_io = require("socket.io");
var config = require('./config');

//setups
var setupDB = require('./setups/setupDB');
var setupStrategy = require('./setups/setupStrategy');



// Express
var app = express();
var sessionStore = new session.MemoryStore();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    store: sessionStore,
    saveUninitialized: false
}));
app.use(flash());

//passport
var passport    = require('passport');

// uncomment after placing your favicon in /public
app.use(require('morgan')('combined'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//Socket io
var io = socket_io()
app.io  = io;
io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    store: sessionStore,
    success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
    fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
}));
function onAuthorizeFail(data, message, error, accept){
    if(error)
        accept(new Error(message));
    console.log('failed connection to socket.io:', message);
    accept();
}
function onAuthorizeSuccess(data, accept){
    console.log('successful connection to socket.io');
    accept(null, true);
}

//Routes
var index = require('./routes/index') (io);
var login = require('./routes/login') (io);
var register = require('./routes/register')(io);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use('/', index);
app.use('/login',login);
app.use('/register',register);

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
      //console.error(err);
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
