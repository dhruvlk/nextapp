const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const { getDecodedToken } = require('./token');
const { getMessage } = require('./messages');
const logger = require('../logger');

const getUser = async (req, res, UserModel) => {
  if (!req) {
    return null;
  }
  const token = req.headers.authorization;
  if (!token) {
    throw new AuthenticationError(getMessage('NOT_LOGGEDIN'));
  }

  if (!token.startsWith('Bearer ')) {
    throw new AuthenticationError(getMessage('INVALID_TOKEN'));
  }

  const authToken = token.slice(7, token.length);
  try {
    const decodedToken = await getDecodedToken(authToken);
    const user = await UserModel.findByPk(decodedToken.userId);
    return user;
  } catch (error) {
    logger.info(error);
    throw error;
  }
};

const validateToken = async (token, UserModel) => {
  if (!token.startsWith('Bearer ')) {
    throw new AuthenticationError(getMessage('INVALID_TOKEN'));
  }

  const authToken = token.slice(7, token.length);
  try {
    const decodedToken = await getDecodedToken(authToken);
    const user = await UserModel.findByPk(decodedToken.userId);
    return user;
  } catch (error) {
    logger.info(error);
    throw error;
  }
};

const generatePassword = passwordString => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(passwordString, salt);
  } catch (error) {
    logger.info(error);
    throw error;
  }
};

module.exports = { getUser, validateToken, generatePassword };
