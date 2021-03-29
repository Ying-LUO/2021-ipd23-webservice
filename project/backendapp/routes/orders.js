var express = require('express');
var router = express.Router();
const sql = require('../db');

const cryptoRandomString = require('crypto-random-string');

/* GET orders list */
router.get('/', function(req, res) {
  sql.query("SELECT * FROM orders", (error, results, fields) => {
    if(error) throw error;
    res.json(results);
  });
});

/* GET order by id */
router.get('/:id', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM orders WHERE id=?",[req.params.id], function(error, results, fields){
    if (error) throw error;
    res.json(results);
  });
});

/* GET order by order_number */
router.get('/order_number/:order_number', function(req, res) {
    console.log(req.params);
    sql.query("SELECT * FROM orders WHERE order_number LIKE ?",['%'+req.params.order_number+'%'], function(error, results, fields){
    if (error) throw error;
    res.json(results);
    });
});

/* INSERT one order */
router.post('/', (req,res) => {
    console.log(req.body);
    let amount = 0;
    sql.query("SELECT * FROM products WHERE id=?",[req.body.productId], function(error, results, fields){
      if (error) throw error;
       amount = req.body.quantity * results[0].price;
       const sqlString = `INSERT INTO orders (order_number, userId, productId, quantity, amount ) 
                          VALUES ('${"order"+ cryptoRandomString({length: 4, type: 'numeric'})}', '${req.body.userId}', '${req.body.productId}', '${req.body.quantity}', '${amount}')`;
        sql.query(sqlString, (error, results) => {
           if(error) throw error;
           res.json(results);
            });
      });
})

/* DELETE order by id */
router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  sql.query('DELETE FROM orders WHERE id=?',[req.params.id], function(error, results, fields){
    if (error) throw error;
      res.json(results);
  });
});


/* EDIT order by id */
router.put('/:id', function(req, res) {
    console.log(req.params);
    console.log(req.body);
    sql.query("SELECT * FROM products WHERE id=?",[req.body.productId], function(error, results, fields){
      if (error) throw error;
      let amount = req.body.quantity * results[0].price;
      sql.query('UPDATE orders SET productId=?, quantity=?, amount=? WHERE id=?',
            [req.body.productId, req.body.quantity, amount, req.params.id], 
            function(error, results, fields){
                if (error) throw error;
                  res.json(results);
       });

    });
});

module.exports = router;