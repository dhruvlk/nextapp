const { ApolloError } = require('apollo-server-express');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { generatePassword } = require('../../../utils/context');

const verifyUser = async (_, args, ctx) => {
  try {
    const { models } = ctx;
    const { data: { id, token, password } } = args;
    const {
      User: UserModel,
    } = models;

    const userInstance = await UserModel.findOne({ where: { id } });

    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }

    if (!userInstance.verificationToken || userInstance.verificationToken !== token) {
      throw new ApolloError(getMessage('INVALID_TOKEN'));
    }

    const userPassword = await generatePassword(password);

    await UserModel.update({
      verificationToken: null,
      emailVerified: true,
      password: userPassword,
    }, { where: { id } });

    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_VERIFY_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE verifying user >>>', error);
    return error;
  }
};

module.exports = verifyUser;
