var express = require('express');
var router = express.Router();

let orders = [
  {
    id: 1,
    productName: "Reebok shoes",
    price: 200,
    color: "black",
    quantity: 200
  },
  {
    id: 2,
    productName: "sports t shirt",
    price: 100,
    color: "blue",
    quantity: 100
  }
];

// single resource
  // - get api to get one order by id
  router.get('/:orderId', function(req, res, next) {
    console.log(req.params);
    const foundIndex = orders.findIndex(o=>o.id == req.params.orderId);
    if(foundIndex >= 0){
      res.send({orders:orders[foundIndex]});
    }else{
      res.json({resp: "order not found"});
    }
  });
  // - put api to edit one order by id
  router.put('/:orderId', function (req, res) {
    console.log(req.params);
    const foundIndex = orders.findIndex(o=>o.id == req.params.orderId)
    if(foundIndex >= 0){
      orders[foundIndex] = req.body;
      res.json({orders:orders});
    }else{
      res.json({resp: "order not found"});
    }
  });
  // - delete apit to delete one order by id
  router.delete('/:orderId', function (req, res) {
    console.log(req.params);
    const foundIndex = orders.findIndex(o=>o.id == req.params.orderId)
    if(foundIndex >= 0){
      orders.splice(foundIndex, 1); 
      res.json({orders:orders});
    }else{
      res.json({resp: "order not found"});
    }
  });
  // - post api to create a new order
  router.post('/', function(req, res){
    console.log(req.body);
    orders.push(req.body);
    res.json({resp: "orders request recieved"});
  });
  
// All resources
  // - get api to fetch all the orders
  router.get('/', function(req, res, next) {
    res.json({orders:orders}); 
  });
  // - put api to edit all the orders
  router.put('/', function (req, res) {
  console.log(req.body);
  orders = req.body.orders;
  res.json({orders:orders});
  });
  // - delete api to delete all orders 
  router.delete('/', function (req, res) {
    orders.length = 0;
    res.json({orders:orders});
  });

module.exports = router;