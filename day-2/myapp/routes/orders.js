var express = require('express');
var router = express.Router();

const orders = [{orderId: 1, item:"apple", qty: 7},{orderId:2, item:"pear", qty:5}, {orderId:3, item:"grape", qty:4}];

/* GET orders listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  //res.send({orders:orders});
  res.json({orders:orders});  // use for send back json format to client
});

/* POST order */
router.post('/', function(req, res){
  orders.push(req.body);
  console.log(req.body); // get body part of request
  res.json({resp: "orders request recieved"});
});

module.exports = router;