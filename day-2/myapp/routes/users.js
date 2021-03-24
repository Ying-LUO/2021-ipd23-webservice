var express = require('express');
var router = express.Router();

//not const
let users = [{name: "superman", age: 777},{name:"catwoman", age:35}, {name:"batman", age:40}];
  
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.send({users:users});
  //res.json({users:users});  // use for send back json format to client
});

// Write an api to fetch one specific user by name - get api
router.get('/:name', function(req, res, next) {
  const foundIndex = users.findIndex(a=>a.name === req.params.name)
  if(foundIndex >= 0){
    res.json({users:users[foundIndex]});
  }else{
    res.json({resp: "user not found"});
  }
});

/* POST user */
router.post('/', function(req, res){
  // log the request informations
  //console.log(req);
  users.push(req.body);
  console.log(req.body); // get body part of request
  res.json({resp: "request recieved"});
});

// all fileds required for update
// Write an api to edit one specific user by name - put api
router.put('/:name', function (req, res) {
  const foundIndex = users.findIndex(a=>a.name === req.params.name)
  if(foundIndex >= 0){
    users[foundIndex] = req.body;
    res.json({users:users});
  }else{
    res.json({resp: "user not found"});
  }
})

// partial fileds required
router.patch('/:name', function (req, res) {
  const foundIndex = users.findIndex(a=>a.name === req.params.name)
  if(foundIndex >= 0){
    if(req.body.name){
      users[foundIndex].name = req.body.name;
    }
    if(req.body.age){
      users[foundIndex].age = req.body.age;
    }
    res.json({users:users});
  }else{
    res.json({resp: "user not found"});
  }
})

router.put('/', function (req, res) {
  //way 1
  users = req.body.users;
  res.json({users:users});

  //way 2
  // users.length = 0;  // use to erase all the element in arrays
  // req.body.users.forEach(element => {
  //   users.push(element);
  // });
  // console.log(req.body); 
  // res.json({resp: "put request recieved"});
})

router.delete('/', function (req, res) {
  console.log(req.params)
  users.length = 0;
  //users = [];
  res.json({users:users});
  //res.json({resp: "DELETE request recieved"});
})

router.delete('/:name', function (req, res) {
  console.log(req.params);
  users = users.filter(a => a.name!==req.params.name);
  res.json({users:users});
  // const foundIndex = users.findIndex(a=>a.name === req.params.name);
  // if(foundIndex >= 0){
  //   users.splice(foundIndex, 1);  // 1 means only delete 1 element
  //   res.json({users:users});
  // }else{
  //   res.json({resp: "user not found"});
  // }
})

// Write an API to fetch one specific user by name
module.exports = router;
