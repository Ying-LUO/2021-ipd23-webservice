var express = require('express');
var router = express.Router();
const sql = require('../db');

function dateFormat(jsonDate) {
    var date = new Date(jsonDate);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-CA', options);
  }

function dayDifferent(expiryDate) {
    let timeDifference = Math.abs(new Date(expiryDate).getTime() - new Date().getTime());
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

/* GET products list */
router.get('/', function(req, res) {
  sql.query("SELECT * FROM products", (error, results, fields) => {
    if(error) throw error;
    results.forEach(product => {
        product.expiry_date = dateFormat(product.expiry_date);
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
        });
    res.json(results);
    });
});

/* INSERT one product */
router.post('/', (req,res) => {
    console.log(req.body);
    const sqlString = `INSERT INTO products (sku_id, product_name, expiry_date, days_to_expire_from_today) 
    VALUES ('${req.body.sku_id}', '${req.body.product_name}', '${req.body.expiry_date}', '${dayDifferent(req.body.expiry_date)}')`;
    sql.query(sqlString, (error, results) => {
        if(error) throw error;
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
    sql.query('UPDATE products SET sku_id=?, product_name=?, expiry_date=?, days_to_expire_from_today=? WHERE id=?',
            [req.body.sku_id, req.body.product_name, req.body.expiry_date, dayDifferent(req.body.expiry_date), req.params.id], 
            function(error, results, fields){
                if (error) throw error;
                  res.json(results);
  });
});

module.exports = router;