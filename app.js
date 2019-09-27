
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const basicAuth = require('basic-auth-connect');

const index_router = require('./routes/index');
const translate_router = require('./routes/translate');
const speech_router = require('./routes/speech');

const app = express();


if (! process.env.SKIP_BASIC_AUTH) {
  const username = process.env.BASIC_USERNAME || 'username';
  const password = process.env.BASIC_PASSWORD || 'password';

  app.use(basicAuth(username, password));
}


// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/translate', translate_router);
app.use('/speech', speech_router);
app.use('/', index_router);

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

