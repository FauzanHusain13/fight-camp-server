var createError = require('http-errors');
var express = require('express');
var path = require('path');
const methodOverride = require("method-override")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const cors = require("cors")

// konfigurasi router
const adminRouter = require('./app/admin/router');
const dashboardRouter = require('./app/dashboard/router');
const membershipRouter = require('./app/membership/router');
const bankRouter = require('./app/bank/router');
const trainingRouter = require('./app/training/router');
const discountRouter = require('./app/discount/router');
const confirmationRouter = require('./app/confirmation/router');
const registratedRouter = require('./app/registrated/router');

const galleryRouter = require('./app/gallery/router');

// konfigurasi api
const authRouter = require("./app/auth/router")
const userRouter = require("./app/user/router")

const app = express();
const URL = "/api/v1";
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))
app.use(methodOverride("_method"))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use("/", adminRouter)
app.use('/dashboard', dashboardRouter);
app.use('/membership', membershipRouter);
app.use('/bank', bankRouter);
app.use('/training', trainingRouter);
app.use('/discount', discountRouter);
app.use('/confirmation', confirmationRouter);
app.use('/registrated', registratedRouter);

app.use('/gallery', galleryRouter);

// api
app.use(`${URL}/users`, userRouter)
app.use(`${URL}/auth`, authRouter)

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
