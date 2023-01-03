const { ApolloError } = require('apollo-server');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { sequelize } = require('../../../models');

const deleteReview = async (_, args, ctx) => {
  let transaction;
  try {
    const { id } = args;
    const {
      Review: ReviewModel,
    } = ctx.models;
    const { user } = ctx.req;

    transaction = await sequelize.transaction();

    const reviewInstance = await ReviewModel.findByPk(id);

    if (!reviewInstance) {
      throw new ApolloError(getMessage('REVIEW_NOT_FOUND'));
    }

    await ReviewModel.destroy({ where: { id }, transaction });

    await transaction.commit();

    const response = {
      status: 'SUCCESS',
      message: getMessage('REVIEW_DELETED_SUCCESS'),
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

module.exports = deleteReview;
