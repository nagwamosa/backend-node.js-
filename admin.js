const express = require('express');
const  mysql = require('mysql');
const { query } = require('mssql');
const app = express();
const router = require('express').Router();
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
const movies = [];

// Get request => get all movies
app.get("/", (req, res) => {
    connection.query("select * from movie", (err, result, fields) => {
        res.send(result);
    });
});
// Post request => save a movie
app.post("/", (req, res) => {
    const data = req.query;
    // INSERT INTO tableName SET column1 = 'value1', column2 = 'value2';
    // he uses this way here
 
    connection.query(`INSERT INTO movie (name, description) VALUES ('${data.name}', '${ data.description}'`,
        //{ name: data.name, description: data.description },
        (err, result, fields) => {
            if (err) {
                result.statusCode = 500;
                res.send({
                    message: "Failed to save the movie"
                })

            } else {
                res.json({
                    message: "Movie created !"
                })
            }
        });

});

// Get request => get a specific movie
router.get("/:id", (req, res) => {
    const { id } = req.params;
    // you can also use :
    // "select * from movie where id=?",{id}
    connection.query("select * from movie where ?", { id: id }, (err, result, fields) => {
        // if there is no result this will return undefined which means false
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.statusCode = 404;
            res.json({
                message: "Movie not found",
            });
        }
    });
});
;

// Put request => modify a specific movie
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;
    connection.query("update movie set ? where id = ?",
        [{ name: data.name, description: data.description }, id], (err, result) => {
            if (err) {
                res.statusCode = 505;
                res.json({
                    message: "Failed to update the movie"
                });
            } else {
                res.json({
                    message: "Movie updated successfully"
                });
            }
        });
});

// Delete request => delete a movie
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    connection.query("delete from movie where ?", { id: id }, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                message: "failed to delete the movie",
            });
        }
        res.json({
            message: "Movie deleted successfully"
        })
    });
});
app.listen(4000, 'localhost', () => {
    console.log("SERVER IS RUNNING");
});
module.exports = router;