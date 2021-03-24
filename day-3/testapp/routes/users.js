var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res){
  // log the request informations
  console.log(req);
  res.json({resp: "request recieved"});
});

module.exports = router;
