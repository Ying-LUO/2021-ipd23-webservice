var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const orders = [{orderId: 1, item:"apple", qty: 7},{orderId:2, item:"pear", qty:5}, {orderId:3, item:"grape", qty:4}];
  //res.send('respond with a resource');
  //res.send({orders:orders});
  res.json({orders:orders});  // use for send back json format to client
});

module.exports = router;