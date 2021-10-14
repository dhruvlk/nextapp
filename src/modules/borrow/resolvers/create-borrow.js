const { ApolloError } = require('apollo-server');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
require('dotenv').config();
const createBorrow = async (_, args, ctx) => {
  try {
    const { data } = args;
    const {
      Book: BookModel,
      Borrow: BorrowModel,
    } = ctx.models;

    const { user } = ctx.req;

    const borrowData = {
      ...data,
    };

    await BorrowModel.create(borrowData, { returning: true });

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

module.exports = createBorrow;
