var express = require('express');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');
const app = express();

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
////////////////////في ربط هنا بالفرونت search ////////
app.get('/search?', function(req, res, next) {
    var from  = req.query.from;
    var to = req.query.to;
    // var timing = req.query.time;
    var sql = "SELECT * from travelinfo WHERE from = ? AND to = ?"; 
    connection.query(sql, [from,to], 
      function (error, result) {
      
              if (error) {res.redirect("/");}
              else {
                console.log(result);
                res.send(result);
                      /////////// ليه علاقة بالفرونت //////
                      //////// وده بيعمل اني لما اجي اسيرش عن حاجة موجودة وحاجة لا ////////
                // if (result.length > 0) {
                //   str = JSON.stringify(result);
                //   obj = JSON.parse(str);
        
                //   console.log(obj);
        
                //   busData = obj;
        
                //   msg1: true;
                //   msg2: false;
        
                //   //  businfo:[obj[0].busNo, obj[0].from, obj[0].to]
        
                //   toRender.user = true;
                //   console.log(busData);
        
                //   users.from = from;
                //   users.to = to;
                //   users.date = timing;
        
                //   // res.cookie("cookies", users);
                //   // localStorage.setItem("localstorage", user);
        
                //   res.redirect("/");
                // } else {
                //   busData = null;
                //   msg1: false;
                //   msg2: true;
                //   toRender.user = false;
                //   res.redirect("/");
                // }
              }
            }
          );
        });
// app.get("/", (req, res) => {
//     connection.query("select * from travelinfo", (err, result, fields) => {
//         res.json(result);
//     });
   
// });
        app.listen(4000, 'localhost', () => {
            console.log("SERVER IS RUNNING");
        });
        