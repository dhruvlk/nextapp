const express = require('express');
const app = express();
const auth = require('../../middleware/auth');
const createEvent = require('./controller/createvent');
const createInvite = require('./controller/createinvite');
const list = require('./controller/list');
const specific = require('./controller/specific');
const update = require('./controller/update');
const refreshToken = require('../user/controller/refreshToken');
var router = express.Router();

router.post('/create', auth, createEvent);
router.post('/invite', auth, createInvite);
router.get('/list', auth, list);
router.get('/:eventname', auth, specific);
router.put('/updatevent', auth, update);

module.exports = router;