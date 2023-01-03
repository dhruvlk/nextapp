const { ApolloError } = require('apollo-server');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
require('dotenv').config();
const createReview = async (_, args, ctx) => {
  try {
    const { data } = args;
    const {
      Book: BookModel,
      User:UserModel,
      Review: ReviewModel,
    } = ctx.models;

    const { user } = ctx.req;

    bookInstance = BookModel.findByPk(data.bookId)

    if(!bookInstance)
    {
      throw new ApolloError(getMessage('BOOK_NOT_FOUND'));
    }

    const reviewData = {
      ...data,
      userId: user.id,
    };

    await ReviewModel.create(reviewData, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('REVIEW_CREATE_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE CREATING review>>>', error);
    return error;
  }
};

module.exports = createReview;
