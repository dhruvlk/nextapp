//user route
const express = require('express');
const app = express();
const login = require('./controller/login');
const reg = require('./controller/register');
const logout = require('./controller/logout');
const updatePassword = require('./controller/updatepassword');
const refreshToken = require('./controller/refreshToken');

var router = express.Router();
app.use(express.json());
router.get('/', (req, res) => {
    res.send("Hello World")
})
router.post('/register', reg);
router.post('/refreshToken', refreshToken);
router.post('/login', login);
router.get('/logout', logout);
router.put('/updatepassword', updatePassword);

module.exports = router;