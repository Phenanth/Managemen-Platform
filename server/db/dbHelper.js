'use strict'

const Express = require('express');
const router = Express.Router();
const db = require('./connect.js');

const Login = (req, res) => {
	res.json({
		info: 200,
		success: true
	});
}

module.exports = (router) => {

	router.get('/login', Login);

}
