var express = require('express');
var router = express.Router();
const sql = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.query("select * from superheros", function(error, results, fields){
    if(error) throw error;
    res.json(results);
  })
});

/*
// - post api to create a new superhero
router.post('/', function(req, res){
  const sqlString = `INSERT INTO superheros (name, age, image_url) VALUES
  ('${req.body.name}', '${req.body.age}', '${req.body.image_url}')`;
  sql.query(sqlString, (error, results)=>{
    if(error) throw error;
    res.json(results)
  });
});
*/

// Another way for post if any field is null
// - post api to create a new superhero
router.post('/', function(req, res){
  console.log(req.params);
  var data = req.body;
  sql.query('INSERT INTO superheros SET ?', data, function (error, results, fields){
    if(error) throw error;
    res.json(results);
  });
});

// Delete one superhero by Id
router.delete('/:heroId', function (req, res) {
  console.log(req.params);
  var id= req.params.heroId;
  var sqlString = 'DELETE FROM superheros WHERE id = ?';
  sql.query(sqlString, [id], function (err, data) {
    if (error) throw error;
    console.log(data.affectedRows + " record(s) updated");
  });
});

// Edit one superhero

module.exports = router;