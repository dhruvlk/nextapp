const jwt = require('jsonwebtoken');
const logger = require('../logger');

const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const decode = jwt.verify(token, process.env.SECRET);
    console.log(decode);
    req.user = decode.id;
    next();
  }
  catch (err) {
    logger.error("User is not authenticated");
    res.json("User is not authenticated");
  }
}

module.exports = auth;