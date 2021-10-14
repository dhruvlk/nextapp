const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const adminUpdate = async (_, args, ctx) => {
  try {
    const { models } = ctx;
    const { data: { userId, activate } } = args;
    const {
      User: UserModel,
    } = models;

    const userInstance = await UserModel.findByPk(userId);

    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }

    await UserModel.update({ where: { id: userId } });

    const response = {
      status: 'SUCCESS',
      message: getMessage('SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM admin-update >>>', error);
    return error;
  }
};

module.exports = adminUpdate;
