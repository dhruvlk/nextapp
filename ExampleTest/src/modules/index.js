const express = require('express');
const app = express();
var router = express.Router();
const userRout = require('./user/index');
const eventRout = require('./event/index');
router.use('/user', userRout);
router.use('/event', eventRout);

module.exports = router;