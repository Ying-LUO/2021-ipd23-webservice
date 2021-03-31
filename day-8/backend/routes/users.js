const express = require('express');
const router = express.Router();
const sql = require('../db');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).optional(),
  image_url: Joi.string().optional(),
  password: Joi.string().min(4).required()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.query("SELECT * FROM users", (error, results, fields) => {
    if(error) throw error;
    res.json(results);
  });
});

/* POST /heros */
router.post('/', validator.body(createUserSchema), function(req, res, next) {
  console.log(req.body);
  sql.query('INSERT INTO USERS SET ?', req.body, (error, results) => {
      // if(error){
      //   next(error);
      //   return;
      // }
      // specific error code
      if(error){
        if(error.code === 'ER_DUP_ENTRY'){
          res.status(404).send({
            message: "User already exists. Please sign in or use another email."
          });
        }
      }
      next(error);
      res.json(results);
  });
});

module.exports = router;
