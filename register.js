
//const router = express.Router();
//const db  = require('./dbConnection');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var express = require('express');

const { v4 } = require('uuid');
const app = express();

const path = require('path');

const createError = require('http-errors');

const bodyParser = require('body-parser');
const cors = require('cors');
const { check } = require('express-validator');
const router = require('express').Router(); 


 
app.use(express.json());

// const connection = require('./db/connection.js')
// parse application/x-www-form-urlencoded
const  mysql = require('mysql');
const { query } = require('mssql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project',
    port: '3306',
  });
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
//  exports.signupValidation = [
//     check('name', 'Name is requied').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ]
 

 
// app.use(express.json());
 
// exports.signupValidation = [
//     check('name', 'Name is requied').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ]
 
// app.post('/register',exports.signupValidation, (req, res, next) => {
//   connection.query(
//     `
//     SELECT * FROM user 
//     WHERE email = "${user_email_address}" `)},
//     (err, result) => {
//       if (result.length) {
//         return res.status(409).send({
//           msg: 'This user is already in use!'
//         });
//       } else {
//         // username is available
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).send({
//               msg: err
//             });
//           } else {
//             // has hashed pw => add to database
//             connection.query(
//               `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(
//                 req.body.email
//               )}, ${db.escape(hash)})`,
//               (err, result) => {
//                 if (err) {
//                   throw err;
//                   return res.status(400).send({
//                     msg: err
//                   });
//                 }
//                 return res.status(201).send({
//                   msg: 'The user has been registerd with us!'
//                 });
//               }
//             );
//           }
//         });
//       }
//     }
//   );


// app.post("/", (req, res) => {
//   const data = req.body;
//   // INSERT INTO tableName SET column1 = 'value1', column2 = 'value2';
//   // he uses this way here
//   connection.query("insert into user set ?",
//       { name: data.name, email: data.email },
//       (err, result, fields) => {
//           if (err) {
//               // result.statusCode = 500;
//               res.send({
//                   message: "Failed to save the movie"
//               })

//           } else {
//               res.json({
//                   message: "Movie created !"
//               })
//           }
//       });

// });




///////test ملهاش لازمة ///
// app.get("/", (req, res) => {
//     connection.query("select * from user", (err, result, fields) => {
//         res.json(result);
//     });
//   });
   

app.listen(4000, 'localhost', () => {
  console.log("SERVER IS RUNNING");
});
 
  module.exports = router;