var express = require('express');
var router = express.Router();
const sql = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.query("select * from superheros", function(error, results, fields){
    if(error) throw error;
    res.json(results);
  })
});

module.exports = router;