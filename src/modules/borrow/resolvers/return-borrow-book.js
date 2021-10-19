const { ApolloError } = require('apollo-server-errors');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const moment = require('moment');
const CONFIG = require('../../../../config/config');
const returnBook = async (_, args, ctx) => {
    try {
        const { data } = args;
        const {
            Borrow: BorrowModel,
            Penalty: PenaltyModel
        } = ctx.models;

        const borrowInstance = await BorrowModel.findOne({
            where: {
                userId: data.userId,
                bookId: data.bookId,
                returnDate: null,
            }
        })

        if (!borrowInstance) {
            throw new ApolloError(getMessage('BOOK_NOT_BORROWED'));
        }

        if (!data.returnDate) {
            data['returnDate'] = Date.now();
        }

        let fineAmount;

        if (moment(borrowInstance.expiryDate).isBefore(moment(data.returnDate).add(0, 'days'))) {
            fineAmount = CONFIG.fine;
        }
        
        if (fineAmount > 0) {
            const penaltyInstance = await PenaltyModel.findOne({
                where: {
                    borrowId: borrowInstance.id
                }
            })
            if (!penaltyInstance) {
                throw new ApolloError(`please pay rs.${fineAmount} `);
            }
        }

        await borrowInstance.update({ returnDate: data.returnDate });

        const response = {
            status: "SUCCESS",
            message: getMessage('BORROW_BOOK_RETURN_SUCCESS'),
        };

        return response;

    } catch (error) {
        logger.error('ERROR WHILE Return book>>>', error);
        return error;
    }
};

module.exports = returnBook;
