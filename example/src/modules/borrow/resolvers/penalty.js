const { ApolloError } = require('apollo-server-errors');
const logger = require('../../../logger');
const { getMessage } = require('../../../utils/messages');
const moment = require('moment');
const CONFIG = require('../../../../config/config');
const payFine = async (_, args, ctx) => {
    try {
        const { id: borrowId } = args;
        const {
            Borrow: BorrowModel,
            Penalty: PenaltyModel
        } = ctx.models;

        const borrowInstance = await BorrowModel.findByPk(borrowId);
        if (!borrowInstance) {
            throw new ApolloError(getMessage('BOOK_NOT_BORROWED'));
        }

        if (!borrowInstance) {
            throw new ApolloError(getMessage('BOOK_NOT_BORROWED'));
        }

        const penaltyInstence = await PenaltyModel.findOne({ where: { borrowId } });

        if (penaltyInstence) {
            throw new ApolloError(getMessage('FINE_PAID'));
        }

        let fineAmount;
        if (moment(borrowInstance.expiryDate).isBefore(moment().add(-1, 'days'))) {
            fineAmount = CONFIG.fine;
        }
        if (moment(borrowInstance.expiryDate).isBefore(moment().subtract(5, 'days'))) {
            fineAmount = CONFIG.extraFine;
        }

        if (fineAmount > 0) {
            await PenaltyModel.create({ borrowId, fineAmount });
        }
        else {
            throw new ApolloError(getMessage('NO_FINE'));
        }
        const response = {
            status: "SUCCESS",
            message: getMessage('FINE_PAID_SUCCESS'),
        };

        return response;

    } catch (error) {
        logger.error('ERROR WHILE pay fine>>>', error);
        return error;
    }
};

module.exports = payFine;
