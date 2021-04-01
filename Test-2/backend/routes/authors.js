var express = require('express');
var router = express.Router();

const sql = require('../db');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const authorSchema = Joi.object({
  name: Joi.string().alphanum(),
  writing_type: Joi.string().required(),
  email: Joi.string().email()
})

/* GET authors list */
router.get('/', function(req, res) {
  sql.query("SELECT * FROM authors", (error, results, fields) => {
    if(error) throw error;
    results.forEach(author => {
      sql.query("SELECT * FROM books WHERE author_id=?",[author.id], function(error, bookresults, fields){
        if (error) throw error;
        author.books = bookresults;
        console.log(author.books);
      });
    });
    res.json(results);
  });
});

/* GET author by id */
router.get('/:id', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM authors WHERE id=?",[req.params.id], function(error, results, fields){
    if (error) throw error;
    res.json(results);
  });
});

/* GET author by any string in name*/
router.get('/name/:name', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM authors WHERE name like ? ", ['%'+req.params.name+'%'], (error, results, fields) => {
      if(error) throw error;
      res.json(results);
    });
});

/* GET author by email */
router.get('/email/:email', function(req, res) {
  console.log(req.params);
  sql.query("SELECT * FROM authors WHERE email LIKE ?",[req.params.email], function(error, results, fields){
      if (error) throw error;
      res.json(results);
  });
});

/* INSERT one author */
router.post('/', validator.body(authorSchema), (req,res,next) => {
    console.log(req.body);
    sql.query('INSERT into authors SET ?', req.body, (error, result) => {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).send({
              message: "Author already exists. Please use another email."
            });
            return;
          }
          next(error);
        }
        res.json(result);
      });
})

/* DELETE author by id */
router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  sql.query('DELETE FROM authors WHERE id=?',[req.params.id], function(error, results, fields){
    if (error) throw error;
      res.json(results);
  });
});


/* EDIT author by id */
router.put('/:id', function(req, res) {
    console.log(req.params);
    console.log(req.body);
    sql.query('UPDATE authors SET name=?, writing_type=?, email=? WHERE id=?',
            [req.body.name, req.body.writing_type, req.body.email, req.params.id], 
            function(error, results, fields){
                if (error) throw error;
                  res.json(results);
  });
});

module.exports = router;
