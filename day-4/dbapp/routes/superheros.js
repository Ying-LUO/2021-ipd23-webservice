var express = require('express');
var router = express.Router();
const sql = require('../db');

/* GET users listing. */
router.get('/', function(req, res) {
  // sql.query("select * from superheros", function(error, results, fields){
  //   if(error) throw error;
  //   res.json(results);
  // });
  // Same as above
  sql.query("SELECT * FROM superheros", (error, results, fields) => {
    if(error) throw error;
    res.json(results);
  });
});

router.get('/:id', function(req, res) {
  console.log(req.params);
  sql.query("SELECT * FROM superheros WHERE id=?",[req.params.id], function(error, results, fields){
    if (error) throw error;
      res.json(results);
  });
});

// router.post('/', (req,res) => {
  
//   const sqlString = `INSERT INTO superheros (name, age, image_url) VALUES ('${req.body.name}', '${req.body.age}', '${req.body.image_url}')`;
  
//   sql.query(sqlString, (error, results) => {
//     if(error) throw error;
//     res.json(results);
//   });
// })

router.post('/', function(req, res) {
  const data = req.body;
  sql.query('INSERT INTO superheros SET ?', data, function(error, results, fields) {
      if (error) throw error;
      res.json(results);
  });
});

// Delete one superhero by id

router.delete('/:id', function(req, res, next) {
  console.log(req.params);
  sql.query('DELETE FROM superheros WHERE id=?',[req.params.id], function(error, results, fields){
    if (error) throw error;
      res.json(results);
  });
});


// edit one superhero id
router.put('/:id', function(req, res) {
  console.log(req.params);
  console.log(req.body);
  // another way:
  // const body = req.body;
  // const sqlstr = 'UPDATE superheros SET name=${body.name}, age=${body.age}, image_url=${body.image_url} WHERE id=${req.params.id}'
  // sql.query(sqlstr, function(...){...});
  sql.query('UPDATE superheros SET name=?, age=?, image_url=? WHERE id=?',
            [req.body.name, req.body.age, req.body.image_url, req.params.id], 
            function(error, results, fields){
                if (error) throw error;
                  res.json(results);
  });
});

module.exports = router;