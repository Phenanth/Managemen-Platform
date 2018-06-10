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

const Data = (req, res) => {

	let queryString = {
		sql: 'SELECT id, name, sex, major, classId, phone, state, tutorId from ? where id=?',
		values: [req.body.username],
		timeout: 40000
	};

	if (req.body.role == 'student') {
		queryString.sql = 'SELECT id, name, sex, major, classId, phone, state, tutorId FROM students WHERE id=?'
	} else if (req.body.role == 'admin') {
		queryString.sql = 'SELECT id, name, maxNum FROM manager WHERE id=?'
	} else if (req.body.role == 'teacher') {
		queryString.sql = 'SELECT id, name, sex, position, direction, phone FROM teacher WHERE id=?'
	}

	db.query(queryString, function(error, results, fields) {
		let result = results[0];
		console.log("Operation: Data, State: 200");
		if (req.body.role == 'student') {
			res.json({
				info: 200,
				success: true,
				queried: {
					id: result.id,
					name: result.name,
					sex: result.sex,
					major: result.major,
					classId: result.classId,
					phone: result.phone,
					state: result.state,
					tutorId: result.tutorId
				}
			})
		} else if (req.body.role == 'admin') {
			res.json({
				info: 200,
				success: true,
				queried: {
					id: result.id,
					name: result.name,
					maxNum: result.maxNum
				}
			})
		} else if (req.body.role == 'teacher') {
			res.json({
				info: 200,
				success: true,
				queried: {
					id: result.id,
					name: result.name,
					sex: result.sex,
					position: result.position,
					direction: result.direction,
					phone: result.phone
				}
			})
		}
	});

}

const changePassword = (req, res) => {

	let queryString = {
		sql: 'SELECT password AS solution FROM ? WHERE id = ?',
		values: [req.body.username],
		timeout: 40000
	};
	let queryString2 ={
		sql: 'UPDATE ? SET password=? WHERE id=?',
		values: [req.body.newPassword, req.body.username],
		timeout: 40000
	}

	if (req.body.role == 'student') {
		queryString.sql = 'SELECT password AS solution FROM students WHERE id=?'
		queryString2.sql = 'UPDATE students SET password=? WHERE id=?'
	} else if (req.body.role == 'admin') {
		queryString.sql = 'SELECT password AS solution FROM manager WHERE id=?'
		queryString2.sql = 'UPDATE manager SET password=? WHERE id=?'
	} else if (req.body.role == 'teacher') {
		queryString.sql = 'SELECT password AS solution FROM teacher WHERE id=?'
		queryString2.sql = 'UPDATE teacher SET password=? WHERE id=?'
	}

	db.query(queryString, function (error, results, fields) {
		if (results[0].solution != req.body.oldPassword) {
			console.log('Operation: Change Password, State: 404, Message: Wrong former password.');
			res.json({
				info: 404,
				success: false,
				message: 'Wrong former password.'
			})
		} else {
			db.query(queryString2, function (error, results, fields) {
				console.log ('Operation: Change Password, state: 200, Message: Password changed, please re-login.');
				res.json({
					info: 200,
					success: true,
					message: 'Password changed, please re-login.'
				})
			});
			
		}
	});
	
}

module.exports = (router) => {

	router.post('/login', Login);

	router.post('/data', Data);

	router.post('/changePassword', changePassword);

}
