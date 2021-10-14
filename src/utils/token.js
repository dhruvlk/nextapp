const jwt = require('jsonwebtoken');
const { getMessage } = require('./messages');
const CONFIG = require('../../config/config');

const JWT_SECRET = CONFIG.jwt.secret;
const JWT_LIFE_TIME = CONFIG.jwt.lifeTime;

const generateToken = (userId) => new Promise((resolve, reject) => {
  jwt.sign({
    userId,
  }, JWT_SECRET, {
    expiresIn: JWT_LIFE_TIME,
  }, (error, token) => {
    if (error) {
      return reject(error);
    }
    resolve(token);
    return true;
  });
});

const getDecodedToken = token => new Promise((resolve, reject) => {
  try {
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return reject(new Error(getMessage('SESSION_EXPIRED')));
        }
        return reject(error);
      }

      if (!decodedToken.exp || !decodedToken.iat) {
        return reject(new Error('Token had no \'exp\' or \'iat\' payload'));
      }
      resolve(decodedToken);
      return true;
    });
  } catch (err) {
    // throw err;
    return err;
  }
  return true;
});

module.exports = { generateToken, getDecodedToken };
