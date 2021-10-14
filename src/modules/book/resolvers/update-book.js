const { ApolloError } = require('apollo-server-express');
const { pick } = require('lodash');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const allowedData = ['bookName', 'bookAuthor', 'bookEdition', 'noOfCopies'];

const updateBook = async (_, args, ctx) => {
  try {
    const { data } = args;
    const {
      Book: BookModel,
    } = ctx.models;
    
    const bookInstance = await BookModel.findByPk(data.id);

    if (!bookInstance) {
      throw new ApolloError(getMessage('BOOK_NOT_FOUND'));
    }

    const dataToUpdate = pick(data, allowedData);

    await BookModel.update(dataToUpdate, { where: { id: data.id } });

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
