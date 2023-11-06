const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); // session
const passport = require('passport'); // passport
const flash = require('connect-flash'); // flash
const indexRouter = require('./routes/index');
// const apiRouter = require('./routes/api');

// require('./config/passport')(passport); // passport config

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // directory for views
app.set('view engine', 'ejs'); // ejs

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // static files

// session for passport
app.use(session({
  secret: 'secretForSession',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
// // app.use('/api', apiRouter);


app.listen(3000, () => console.log('Server running on port 3000'));