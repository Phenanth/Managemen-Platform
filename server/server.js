'use strict'

const Express = require('express');
const BodyParser = require('body-parser');
const routes = require('./routes.js');
const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/api', routes);

app.use(function (req, res, next) {
	var err = new Error('Page Not Found.');
	err.status = 404;
	next(err);
});

app.listen(3000, function () {
	console.log('Server running at port 3000...');
});

module.exports = app;
