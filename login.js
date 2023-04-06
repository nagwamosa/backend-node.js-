const express = require('express');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');
const app = express();

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
                     ////////////////////////////  login هنا ربط الفرونت////////////////////////
                                          //////////////////////////// ناقص حوار الادمن///////////////////////
/* GET home page. */
// app.get('/', function(req, res, next) {
//     res.render('formate', { title: 'Express', session : req.session });
//   });


app.get('/login?', function(req, res, next) {
   var user_email_address = req.query.email;

    var user_password = req.query.password;
    // var sql = "SELECT * from user WHERE email = ? AND password = ?";
    

    if(user_email_address && user_password)
    {
        que = `
        SELECT * FROM user 
        WHERE email = "${user_email_address}"
        `;

        connection.query(que, function(error, data){

            if(data.length > 0)
            {
                q = `
                SELECT * FROM user 
                WHERE password = "${user_password}"
                `;
                
                    if(q)
                    {
                        admin= `
                        SELECT * FROM user  WHERE type = "admin"`;
                       if(admin){
                        res.send('admin');
                        ///////////هنا ربط صفحة admin 
                       }
                       else{
                         res.send('correct Password');   
                        res.redirect("/");
                        ////////////هنا ربط صفحة اليوزر 
                       }
                    }
                    else
                    {
                        res.send('Incorrect Password');
                    }
                }
            
            else
            {
                res.send('Incorrect Email Address');
            }
            res.end();
        });
    }
    else
    {
        res.send('Please Enter Email Address and Password Details');
        res.end();
    }

});

// app.get('/logout', function(request, res, next){

//     request.session.destroy();

//     res.redirect("/");

// });


app.listen(4000, 'localhost', () => {
    console.log("SERVER IS RUNNING");
});

// module.exports = router;