/* eslint-disable no-await-in-loop */
const userData = require('./data/dummy-users');
const { generatePassword } = require('../utils/context');
const logger = require('../logger');

const createDummyUsers = async models => {
  try {
    const {
      User: UserModel,
    } = models;

    const createUsers = async () => {
      try {
        const users = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const userObj of userData) {
          const hashedPassword = generatePassword(userObj.password);
          userObj.password = hashedPassword;
          const count = await UserModel.count({ where: { email: userObj.email } });
          if (!count) {
            users.push(userObj);
          }
        }

        if (users.length) {
          await UserModel.bulkCreate(users);
        }
      } catch (error) {
        logger.error('ERROR WHILE CREATING users >>>', error);
        throw error;
      }
    };

    // CREATE USERS
    setTimeout(async () => {
      await createUsers();
    }, 10000);
  } catch (error) {
    logger.error('ERROR WHILE CREATING users >>>', error);
    throw error;
  }
};

module.exports = createDummyUsers;
