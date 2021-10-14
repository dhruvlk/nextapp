const { ApolloError } = require('apollo-server');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { sequelize } = require('../../../models');

const deleteBorrow = async (_, args, ctx) => {
  let transaction;
  try {
    const { id } = args;
    const {
      Borrow: BorrowModel,
    } = ctx.models;
    const { user } = ctx.req;

    transaction = await sequelize.transaction();

    const borrowInstance = await BorrowModel.findByPk(id);

    if (!borrowInstance) {
      throw new ApolloError(getMessage('BORROW_NOT_FOUND'));
    }

    if (user.role !== 'ADMIN') {
      throw new ApolloError(getMessage('UNAUTHORIZED'));
    }

    await BorrowModel.destroy({ where: { id }, transaction });

    await transaction.commit();

    const response = {
      status: 'SUCCESS',
      message: getMessage('BORROW_DELETE_SUCCESS'),
    };

    return response;
  } catch (error) {
    if (transaction) {
      transaction.rollback();
    }
    logger.error('ERROR WHILE DELETING comment>>>', error);
    return error;
  }
};

module.exports = deleteBorrow;
