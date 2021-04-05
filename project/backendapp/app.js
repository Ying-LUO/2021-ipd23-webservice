var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');

var app = express();
app.set('trust proxy', 1) // trust first proxy

// middlewares in order
// request will go from cors to logger then express json, and so on... to router
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// Middleware to display all the headers before reaching the routers
app.use((req, res, next) => {
    console.log(req.headers);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Global/default Error handler 
app.use((err, req, resp, next) => {
    console.error(err);

    // Check for joi errors
    if (err && err.error && err.error.isJoi) {
        resp.status(400).json({
            message: err.error.toString(),
            error: err.message
        });
    }
    //  Other errors generated in the system
    else {
        resp.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
})

module.exports = app;
