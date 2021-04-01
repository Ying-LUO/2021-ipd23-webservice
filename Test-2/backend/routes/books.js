var express = require('express');
var router = express.Router();

const sql = require('../db');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const bookSchema = Joi.object({
    title: Joi.string().max(100).required(),
    subtitle: Joi.string().max(255).required(),
    reviews: Joi.number().min(1).required(),
    reviews: Joi.number().max(5).required(),
    publish_date: Joi.date().required(),
    isdn_no: Joi.string().required(),
    price: Joi.number().required(),
    author_id: Joi.number().required()
})

function dateFormat(jsonDate) {
    var date = new Date(jsonDate);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-CA', options);
  }

/* GET books list */
router.get('/', function(req, res) {
  let sqlString = "SELECT * FROM books";
  if(req.query && req.query.isdn_no){
      sqlString += ` WHERE sku_id = '${req.query.isdn_no}'`;
  }
  if(req.query && req.query.title){
    sqlString += ` WHERE book_name LIKE '%${req.query.title}%'`;
  }
  if(req.query && req.query.reviews){
    sqlString += ` WHERE reviews >= '${req.query.reviews}'`;
  }
  sql.query(sqlString, (error, results, fields) => {
    if(error) throw error;
    results.forEach(book => {
        book.publish_date = dateFormat(book.publish_date);
    });
    res.json(results);
  });
});

/* GET book by id */
router.get('/:id', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM books WHERE id=?",[req.params.id], function(error, results, fields){
    if (error) throw error;
    results.forEach(book => {
        book.publish_date = dateFormat(book.publish_date);
        });
    res.json(results);
  });
});

/* GET book by author id */
router.get('/author_id/:author_id', function(req, res) {
  console.log(req.params);
  sql.query("SELECT * FROM books WHERE author_id=?",[req.params.author_id], function(error, results, fields){
  if (error) throw error;
  results.forEach(book => {
      book.publish_date = dateFormat(book.publish_date);
      });
  res.json(results);
});
});

/* GET book by isdn_no */
router.get('/isdn_no/:isdn_no', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM books WHERE isdn_no=?",[req.params.isdn_no], function(error, results, fields){
    if (error) throw error;
    results.forEach(book => {
        book.publish_date = dateFormat(book.publish_date);
        });
    res.json(results);
    });
});

/* GET book by title */
router.get('/title/:title', function(req, res) {
  console.log(req.params);
  sql.query("SELECT * FROM books WHERE title LIKE ?",['%'+req.params.title+'%'], function(error, results, fields){
  if (error) throw error;
  results.forEach(book => {
      book.publish_date = dateFormat(book.publish_date);
      });
  res.json(results);
  });
});

/* INSERT one book */
router.post('/', validator.body(bookSchema), (req,res,next) => {
    console.log(req.body);
    sql.query('INSERT into books SET ?', req.body, (error, result) => {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).send({
              message: "Book already exists. Please check ISDN number."
            });
            return;
          }
          next(error);
        }
        res.json(result);
      });
})

/* DELETE book by id */
router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  sql.query('DELETE FROM books WHERE id=?',[req.params.id], function(error, results, fields){
    if (error) throw error;
      res.json(results);
  });
});


/* EDIT book by id */
router.put('/:id', function(req, res) {
    console.log(req.params);
    console.log(req.body);
    sql.query('UPDATE books SET title=?, subtitle=?, reviews=?, publish_date=?, price=? WHERE id=?',
            [req.body.title, req.body.subtitle, req.body.reviews, req.body.publish_date, req.body.price, req.params.id], 
            function(error, results, fields){
                if (error) throw error;
                  res.json(results);
  });
});

module.exports = router;