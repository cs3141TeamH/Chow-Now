const express = require('express');
const os = require('os');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'classdb.it.mtu.edu',
  user: 'username',
  password: 'password',
  database: 'username'
});

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => {
	res.send({ username: os.userInfo().username });
	console.log(os.userInfo().username);
});

app.get('/api/query', (req, res) => {
    connection.connect();

	let ret;

    connection.query('SELECT 1 + 3 AS solution', (error, results) => {
        if (error) throw error;
        ret = results[0].solution;
        console.log('The solution is: ', results[0].solution);
    });

    res.send({ username: ret });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
