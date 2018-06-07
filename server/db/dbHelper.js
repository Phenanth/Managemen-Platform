'use strict'

const Express = require('express');
const router = Express.Router();
const db = require('./connect.js');
const createToken = require('../middleware/createToken.js');
const checkToken = require('../middleware/checkToken.js');

const Login = (req, res) => {

	let table;
	let validTime;
	let queryString = {
		sql: 'SELECT password AS solution FROM ? WHERE id = ?',
		values: [req.body.username],
		timeout: 40000
	};

	if (req.body.willStore) {
		validTime = '168h';
	} else {
		validTime = '10s';
	}

	if (req.body.role == 'student') {
		queryString.sql = 'SELECT password AS solution FROM students WHERE id=?'
	} else if (req.body.role == 'admin') {
		queryString.sql = 'SELECT password AS solution FROM manager WHERE id=?'
	} else if (req.body.role == 'teacher') {
		queryString.sql = 'SELECT password AS solution FROM teacher WHERE id=?'
	}

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error);
		}
		if (results[0]) {
			let path = '/' + req.body.role + '/' + req.body.username;
			if (req.body.password == results[0].solution) {
				console.log('Operation: Login, State: 200');
				res.json({
					info: 200,
					success: true,
					path: path,
					token: createToken(req.body.username, validTime)
				});		
			} else {
				console.log('Operation: Login, State: 304, Message: Wrong password.');
				res.json({
					info: 304,
					success: false,
					message: 'Wrong password.'
				})
			}
		} else {
			console.log('Operation: Login, State: 404, Message: User not existed.');
			res.json({
				info: 404,
				success: false,
				message: 'User not exists.'
			});
		}
	});
}

module.exports = (router) => {

	router.post('/login', Login);

}
