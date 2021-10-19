const bcrypt = require('bcrypt');
const { getMessage } = require('../../../utils/messages');
const { generateToken } = require('../../../utils/token');
const logger = require('../../../logger');
const jwt = require('jsonwebtoken');
const CONFIG = require('../../../../config/config');

const login = async (_, args, ctx) => {
  try {
    const { data: { email, password } } = args;
    const {
      User: UserModel,
    } = ctx.models;
    let refreshToken;
    const JWT_SECRET = CONFIG.jwt.secret;

    const user = await UserModel.findOne({ where: { email: { $iLike: email } } });

    if (!user) {
      throw new Error(getMessage('USER_NOT_FOUND'));
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error(getMessage('INVALID_CREDENTIALS'));
    }

    if (!user.email) {
      throw new Error(getMessage('EMAIL_NOT_VERIFIED'));
    }

    const token = generateToken(user.id);
    if (user.refreshToken) {
      refreshToken = user.refreshToken
    } else {
      refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET);
      await UserModel.update({ refreshToken }, { where: { id: user.id } })
    }

    return {
      token,
      refreshToken,
      user,
    };
  } catch (error) {
    logger.error('ERROR WHILE login >>>', error);
    return error;
  }
};

module.exports = login;
