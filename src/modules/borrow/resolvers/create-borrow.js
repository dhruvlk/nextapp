const { ApolloError } = require('apollo-server');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
require('dotenv').config();
const createBorrow = async (_, args, ctx) => {
  try {
    const { data } = args;
    const {
      User:UserModel,
      Book: BookModel,
      Borrow: BorrowModel,
    } = ctx.models;

    //const { user } = ctx.req;

    const borrowInstance = await BorrowModel.count({
      where:{ userId:data.userId, bookId:data.bookId }
    })

   /* if(borrowInstance!= 0)
    {
      throw new ApolloError(getMessage('BORROWED_BOOK_EXISTS'))
    }*/

    const bookInstance = await BookModel.findByPk(data.bookId);

    if (!bookInstance) {
      throw new ApolloError(getMessage('BOOK_NOT_FOUND'));
    }

    const userInstance = await UserModel.findByPk(data.userId);

    if (!userInstance) {
      throw new ApolloError(getMessage('USER_NOT_FOUND'));
    }

    const countBorrowedBook =  await BorrowModel.count({
      where:{bookId:bookInstance.id, returnDate:null}
    })

    if(countBorrowedBook>=bookInstance.noOfCopies)
    {
      throw new ApolloError(getMessage('BORROWED_BOOK_EXISTS'));
    }

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
