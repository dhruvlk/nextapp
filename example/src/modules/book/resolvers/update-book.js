const { ApolloError } = require('apollo-server-express');
const { pick } = require('lodash');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const allowedData = ['bookName', 'bookAuthor', 'bookEdition', 'noOfCopies'];

const updateBook = async (_, args, ctx) => {
  try {
    const { id:bookId, data } = args;
    const {
      Book: BookModel,
    } = ctx.models;
    
    const bookInstance = await BookModel.findByPk(bookId);

    if (!bookInstance) {
      throw new ApolloError(getMessage('BOOK_NOT_FOUND'));
    }

    await bookInstance.update(data, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('BOOK_UPDATE_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE updating book >>>', error);
    return error;
  }
};

module.exports = updateBook;
