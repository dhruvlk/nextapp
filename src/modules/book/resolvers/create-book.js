const { ApolloError } = require('apollo-server');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
lodash = require('lodash');

const createBook = async (_, args, ctx) => {
  try {
    const { data } = args;
    const {
      Book: BookModel,
    } = ctx.models;

    const bookData = {
      ...data
    };

    await BookModel.create(bookData, { returning: true });
    const response = {
      status: 'SUCCESS',
      message: getMessage('BOOK_CREATE_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE creating book >>>', error);
    return error;
  }
};

module.exports = createBook;
