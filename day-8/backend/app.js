const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, resp, next)=>{

})


app.use('/', indexRouter);
app.use('/users', usersRouter);

// Global Error Handler
app.use((err, req, resp, next) => {
    console.error(err);
    resp.status(500).json({
        message: "Something went wrong",
        error: err.message
    });
})

module.exports = app;
