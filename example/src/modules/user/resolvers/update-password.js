const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { generatePassword } = require('../../../utils/context');
const { getMessage } = require('../../../utils/messages');

const updatePassword = async (_, args, ctx) => {
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

    const password = await generatePassword(data.password);

    await UserModel.update({ password }, { where: { id: user.id } });

    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_PASSWORD_UPDATED'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE updating password >>>', error);
    return error;
  }
};

module.exports = updatePassword;
