var express = require('express');
var router = express.Router();
const sql = require('../db');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const querySchema = Joi.object({
  sku_id: Joi.string().min(3).required(),
  sku_id: Joi.string().max(10).required(),
  product_name: Joi.string().min(3).required(),
  product_name: Joi.string().max(255).required(),
  category: Joi.string().required(),
  expiry_date: Joi.string().required(),
  price: Joi.number().required()
})

function dateFormat(jsonDate) {
    var date = new Date(jsonDate);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-CA', options);
  }

function dayDifferent(expiryDate) {
    //let timeDifference = Math.abs(new Date(expiryDate).getTime() - new Date().getTime());
    let timeDifference = new Date(expiryDate).getTime() - new Date().getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

/* GET products list */
router.get('/', function(req, res) {
  let sqlString = "SELECT * FROM products";
  if(req.query && req.query.sku_id){
      sqlString += ` WHERE sku_id = '${req.query.sku_id}'`;
  }
  if(req.query && req.query.product_name){
    sqlString += ` WHERE product_name LIKE '%${req.query.product_name}%'`;
  }
  if(req.query && req.query.expiry_date){
    sqlString += ` WHERE expiry_date > '${req.query.expiry_date}'`;
  }
  sql.query(sqlString, (error, results, fields) => {
    if(error) throw error;
    results.forEach(product => {
        product.expiry_date = dateFormat(product.expiry_date);
        product.days_to_expire_from_today = dayDifferent(product.expiry_date);
        sql.query('UPDATE products SET days_to_expire_from_today=? WHERE id=?',
            [dayDifferent(product.expiry_date), product.id], 
            function(error, results, fields){
                if (error) throw error;
         });
    });
    res.json(results);
  });
});

/* GET product by id */
router.get('/:id', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM products WHERE id=?",[req.params.id], function(error, results, fields){
    if (error) throw error;
    results.forEach(product => {
        product.expiry_date = dateFormat(product.expiry_date);
        product.days_to_expire_from_today = dayDifferent(product.expiry_date);
        sql.query('UPDATE products SET days_to_expire_from_today=? WHERE id=?',
            [dayDifferent(product.expiry_date), product.id], 
            function(error, results, fields){
                if (error) throw error;
         });
        });
    res.json(results);
  });
});

/* GET product by sku_id */
router.get('/sku_id/:sku_id', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM products WHERE sku_id=?",[req.params.sku_id], function(error, results, fields){
    if (error) throw error;
    results.forEach(product => {
        product.expiry_date = dateFormat(product.expiry_date);
        product.days_to_expire_from_today = dayDifferent(product.expiry_date);
        sql.query('UPDATE products SET days_to_expire_from_today=? WHERE id=?',
            [dayDifferent(product.expiry_date), product.id], 
            function(error, results, fields){
                if (error) throw error;
         });
        });
    res.json(results);
    });
});

/* GET product by product_name */
router.get('/product_name/:product_name', function(req, res) {
  console.log(req.params);
  sql.query("SELECT * FROM products WHERE product_name LIKE ?",['%'+req.params.product_name+'%'], function(error, results, fields){
  if (error) throw error;
  results.forEach(product => {
      product.expiry_date = dateFormat(product.expiry_date);
      product.days_to_expire_from_today = dayDifferent(product.expiry_date);
      sql.query('UPDATE products SET days_to_expire_from_today=? WHERE id=?',
          [dayDifferent(product.expiry_date), product.id], 
          function(error, results, fields){
              if (error) throw error;
       });
      });
  res.json(results);
  });
});

/* INSERT one product */
router.post('/', validator.body(querySchema), (req,res) => {
    console.log(req.body);
    const sqlString = `INSERT INTO products (sku_id, category, product_name, price, expiry_date, days_to_expire_from_today) 
    VALUES ('${req.body.sku_id}', '${req.body.category}', '${req.body.product_name}', '${req.body.price}', '${req.body.expiry_date}', '${dayDifferent(req.body.expiry_date)}')`;
    sql.query(sqlString, (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(400).send({
            message: "Product already exists. Please use another sku_id."
          });
          return;
        }
        next(error);
      }
        res.json(results);
    });
})

/* DELETE product by id */
router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  sql.query('DELETE FROM products WHERE id=?',[req.params.id], function(error, results, fields){
    if (error) throw error;
      res.json(results);
  });
});


/* EDIT product by id */
router.put('/:id', function(req, res) {
    console.log(req.params);
    console.log(req.body);
    sql.query('UPDATE products SET sku_id=?, product_name=?, price=?, expiry_date=?, days_to_expire_from_today=? WHERE id=?',
            [req.body.sku_id, req.body.product_name, req.body.price, req.body.expiry_date, dayDifferent(req.body.expiry_date), req.params.id], 
            function(error, results, fields){
                if (error) throw error;
                  res.json(results);
  });
});

module.exports = router;