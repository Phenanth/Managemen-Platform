'use strict'

const Express = require('express');
const router = Express.Router();
const checkToken = require('../middleware/checkToken.js');

const isLogin = function (req, res) {

	let token = req.headers['authorization'];

	if (token) {
		console.log('Operation: IsLogin, State: 200');
		res.json({
			info: 200,
			success: true
		});
	} else {
		console.log('Operation: IsLogin, State: 304, Message: User not loged in.');
		res.json({
			info: 304,
			success: false,
			message: 'User not loged in.'
		});
	}

}

module.exports = (router) => {

	router.get('/isLogin', checkToken, isLogin);

}
