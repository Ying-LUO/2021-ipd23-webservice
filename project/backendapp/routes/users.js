var express = require('express');
var router = express.Router();
const sql = require('../db');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const querySchema = Joi.object({
  first_name: Joi.string().alphanum(),
  last_name: Joi.string().alphanum(),
  email: Joi.string().email()
})

/* GET users list */
router.get('/', function(req, res) {
  sql.query("SELECT * FROM users", (error, results, fields) => {
    if(error) throw error;
    res.json(results);
  });
});

/* GET user by id */
router.get('/:id', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM users WHERE id=?",[req.params.id], function(error, results, fields){
    if (error) throw error;
    res.json(results);
  });
});

/* GET user by any string in first_name or last_name */
router.get('/name/:name', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM users WHERE first_name like ? or last_name like ?", ['%'+req.params.name+'%', '%'+req.params.name+'%'], (error, results, fields) => {
      if(error) throw error;
      res.json(results);
    });
});

/* GET user by email */
router.get('/email/:email', function(req, res) {
  console.log(req.params);
  sql.query("SELECT * FROM users WHERE email LIKE ?",[req.params.email], function(error, results, fields){
      if (error) throw error;
      res.json(results);
  });
});

/* INSERT one user */
router.post('/', validator.body(querySchema), (req,res) => {
    console.log(req.body);
    const sqlString = `INSERT INTO users (first_name, last_name, email) 
    VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}')`;
    sql.query(sqlString, (error, results) => {
        if(error) throw error;
        res.json(results);
    });
})

/* DELETE user by id */
router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  sql.query('DELETE FROM users WHERE id=?',[req.params.id], function(error, results, fields){
    if (error) throw error;
      res.json(results);
  });
});


/* EDIT user by id */
router.put('/:id', function(req, res) {
    console.log(req.params);
    console.log(req.body);
    sql.query('UPDATE users SET first_name=?, last_name=?, email=? WHERE id=?',
            [req.body.first_name, req.body.last_name, req.body.email, req.params.id], 
            function(error, results, fields){
                if (error) throw error;
                  res.json(results);
  });
});

module.exports = router;
