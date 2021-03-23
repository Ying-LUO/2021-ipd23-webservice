var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = [{name: "superman", age: 777},{name:"catwoman", age:35}, {name:"batman", age:40}];
  //res.send('respond with a resource');
  res.send({users:users});
  res.json({users:users});  // use for send back json format to client
});

module.exports = router;
