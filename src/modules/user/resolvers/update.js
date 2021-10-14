const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const update = async (_, args, ctx) => {
  try {
    const { data } = args;
    const { models, req } = ctx;
    const {
      User: UserModel,
    } = models;
    const { user } = req;

    const userInstance = await UserModel.findByPk(user.id);

    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }

    let updatedUser = await UserModel.update(data, { where: { id: user.id }, returning: true });

    [, [updatedUser]] = updatedUser;

    updatedUser.message = getMessage('USER_UPDATE_SUCCESS');

    return updatedUser;
  } catch (error) {
    logger.error('ERROR WHILE UPDATING USER>>>', error);
    return error;
  }
};

module.exports = update;
