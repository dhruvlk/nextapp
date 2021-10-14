const { ApolloError } = require('apollo-server');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
require('dotenv').config();
const createReview = async (_, args, ctx) => {
  try {
    const { data } = args;
    const {
      Review: ReviewModel,
    } = ctx.models;

    const { user } = ctx.req;

    const reviewData = {
      ...data,
      userId: user.id,
    };

    await ReviewModel.create(reviewData, { returning: true });

    const response = {
      status: 'SUCCESS',
      message: getMessage('BORROW_CREATE_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE CREATING borrowed>>>', error);
    return error;
  }
};

module.exports = createReview;
