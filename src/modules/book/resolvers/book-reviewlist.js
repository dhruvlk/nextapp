const { ApolloError } = require('apollo-server-express');
const { pick } = require('lodash');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const allowedData = ['bookName', 'bookAuthor', 'bookEdition', 'noOfCopies'];

const reviewBook = async (_, args, ctx) => {
  try {
    const { id:bookId } = args;
    const {
      Book: BookModel,
      Review: ReviewModel
    } = ctx.models;
    
    const bookInstance = await BookModel.findOne({
        where:{id:bookId},
        include: [
          {
            model: ReviewModel,
            as: 'bookReview',
            attributes: ['bookId', 'feedback','userId'],
          },
        ],
        attributes: ['bookName', 'bookAuthor', 'bookEdition'],
      });

    if (!bookInstance) {
      throw new ApolloError(getMessage('BOOK_NOT_FOUND'));
    }

    const response = {
      status: 'SUCCESS',
      message: getMessage('SUCCESS'),
      data: bookInstance  
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE fetching book >>>', error);
    return error;
  }
};

module.exports = reviewBook;
