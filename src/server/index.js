const express = require('express');
const os = require('os');
const mysql = require('mysql');

const app = express();

var connection = mysql.createConnection({
    host     : 'chownow.cvbdf448eti1.us-east-1.rds.amazonaws.com',
    database : 'ChowNow',
    user     : 'admin',
    password : 'tspchownow',
    port     : '3306'
});
  
connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => {
	res.send({ username: os.userInfo().username });
	console.log(os.userInfo().username);
});

app.get('/api/query', (req, res) => {
    let ret;

    connection.query('SELECT 1 + 3 AS solution', (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        ret = results[0].solution;
        console.log('The solution is: ', results[0].solution);
    });

    res.send({ username: ret });
});

app.get('/api/recipes', (req, res) => {
    let ret =[];

    connection.query('SELECT * FROM recipes', (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        //console.log('results: ', results.slice(0));
        ret = results.slice(0);
        res.send({ result: ret });
    }); 
});

app.get('/api/ingredients', (req, res) => {
    let ret =[];

    connection.query('SELECT * FROM ingredients', (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        //console.log('results: ', results.slice(0));
        ret = results.slice(0);
        res.send({ result: ret });
    }); 
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
