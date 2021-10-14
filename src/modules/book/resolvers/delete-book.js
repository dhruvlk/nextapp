const { ApolloError } = require('apollo-server-express');
const { map } = require('lodash');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const { sequelize } = require('../../../models');

const deleteBook = async (_, args, ctx) => {
  let transaction;
  try {
    const { id } = args;
    const {
      Book: BookModel,
     /* postLike: PostLikeModel,
      Comment: CommentModel,
      CommentLike: CommentLikeModel,*/
    } = ctx.models;
    const { user } = ctx.req;

    transaction = await sequelize.transaction();

    const bookInstance = await BookModel.findByPk(id);

    if (!bookInstance) {
      throw new ApolloError(getMessage('BOOK_NOT_FOUND'));
    }

    if  (user.role !== 'ADMIN') {
      throw new ApolloError(getMessage('UNAUTHORIZED'));
    }

    /*let commentIds = await CommentModel.findAll({ where: { postId: id } });
    commentIds = map(commentIds, 'id');
    await CommentLikeModel.destroy({ where: { commentId: { $in: commentIds } }, transaction });
    await CommentModel.destroy({ where: { postId: id }, transaction });
    await PostLikeModel.destroy({ where: { postId: id }, transaction });*/
    await BookModel.destroy({ where: { id }, transaction });

    await transaction.commit();

    const response = {
      status: 'SUCCESS',
      message: getMessage('BOOK_DELETE_SUCCESS'),
    };

    return response;
  } catch (error) {
    if (transaction) {
      transaction.rollback();
    }
    logger.error('ERROR WHILE deleting book >>>', error);
    return error;
  }
};

module.exports = deleteBook;
