'use strict'

const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'departmentAdmin',
	password: '000000',
	database: 'departmentinfo'
});

/*
For debugging:
let queryString = {
	sql: 'SELECT id AS solution FROM students',
	timeout: 40000
};

connection.query(queryString, function(error, results, fields) {
	if (error) {
		throw error;
	}
	for (var i = 0; i < results.length; i++) {
		console.log(results[i].solution);
	};
});
*/
console.log('Database connected.');
/*
connection.end(function(err) {
	if (err) {
		return console.log('error:' + err.message);
	}
	console.log('Closed the database connection.');
});
*/
module.exports = connection;
