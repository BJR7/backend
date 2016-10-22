var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db_handler = require('./controllers/data_handler.js')(); 
var routes = require('./routes/index');
var web_services = require('./routes/web_services');
var users = require('./routes/users');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
var mongouri = process.env.MONGO_URI || "mongodb://coecys:DBc03cys@jello.modulusmongo.net:27017/wir8oneZ";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/web_services',web_services);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Creating Socket io server

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('day_activities', function(data){
    console.log('Llego hasta aqui!!');   
    Create_Day(data);    
    socket.emit('response',"Day saved to database");
  });

  socket.on('save_activities', function(data){
    Get_Date_Activity(data);
    socket.emit('response', "Activities saved in database");
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});

// Connect to MongoDB and create/use database called coecys
mongoose.connect(mongouri,function(err, res){
  if(err)
  {
    console.log('ERR: Connecting to database ' + err);
    return;
  }
    console.log("Connection to database successed");
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
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
    error: {}
  });
});

module.exports = app;
