const { ApolloError } = require('apollo-server-express');
const { pick } = require('lodash');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');

const allowedData = ['issueDate', 'returnDate', 'status'];

const updateBorrow = async (_, args, ctx) => {
  try {
    const { data } = args;
    const {
      Borrow: BorrowModel,
    } = ctx.models;
    const { user } = ctx.req;
    
    const borrowInstance = await BorrowModel.findByPk(data.id);

    if (user.role !== 'ADMIN') {
      throw new ApolloError(getMessage('UNAUTHORIZED'));
    }

    if (!borrowInstance) {
      throw new ApolloError(getMessage('BORROW_NOT_FOUND'));
    }

    const dataToUpdate = pick(data, allowedData);

    await BorrowModel.update(dataToUpdate, { where: { id: data.id } });

    const response = {
      status: 'SUCCESS',
      message: getMessage('BORROW_UPDATE_SUCCESS'),
    };

    return response;
  } catch (error) {
    logger.error('ERROR WHILE UPDATING borrow >>>', error);
    return error;
  }
};

module.exports = updateBorrow;
