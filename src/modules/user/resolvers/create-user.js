const { nanoid } = require('nanoid');
const randomsting = require('randomstring');
const { getMessage } = require('../../../utils/messages');
const { generatePassword } = require('../../../utils/context');
const logger = require('../../../logger');
const CONFIG = require('../../../../config/config');

const createUser = async (_, args, ctx) => {
  try {
    const { user } = args;
    const {
      User: UserModel,
    } = ctx.models;

    const createDataObj = {
      ...user,
      verificationToken: randomsting.generate(64),
      role: 'USER',
    };

     createDataObj.password = await generatePassword(user.password);
     const userCount = await UserModel.count({ where: { email: createDataObj.email } });

    if (userCount) {
      throw new Error(getMessage('USER_EMAIL_EXISTS'));
    }

    await UserModel.create(createDataObj, { returning: true });
    
    const response = {
      status: 'SUCCESS',
      message: getMessage('USER_CREATE_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR FROM create-user>>>', error);
    return error;
  }
};

module.exports = createUser;
