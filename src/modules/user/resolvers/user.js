const { ApolloError } = require('apollo-server-express');
const { getMessage } = require('../../../utils/messages');
const logger = require('../../../logger');

const user = async (_, args, ctx) => {
  try {
    const { models, req } = ctx;
    const {
      User: UserModel,
    } = models;
    const { user: userObj } = req;

    const userInstance = await UserModel.findByPk(userObj.id);

    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }

    return userInstance;
  } catch (error) {
    logger.error('ERROR WHILE FETCHING user>>>', error);
    throw error;
  }
};

module.exports = user;
