'use strict'

const Express = require('express');
const router = Express.Router();
const dbHelper = require('./db/dbHelper.js');
const stateHelper = require('./state/stateHelper.js');

dbHelper(router);
stateHelper(router);

module.exports = router;
