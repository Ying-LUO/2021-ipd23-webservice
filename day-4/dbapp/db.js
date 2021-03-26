'use strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'superherodb'
});

connection.connect(function(err) {
    if (err) {
        console.log("DB dieeeddddd!!! Save the world!!");
        throw err;
    }
    else {
        console.log("DB connection successful");
    }
    
});

module.exports = connection;