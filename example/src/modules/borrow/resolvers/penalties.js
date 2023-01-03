/* eslint-disable camelcase */
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const sort_mapper = {
  borrowId_ASC: 'borrow_id ASC',
  borrowId_DESC: 'borrow_id DESC',
  fineAmount_ASC: 'fine_amount ASC',
  fineAmount_DESC: 'fine_amount DESC',
};

const penalties = async (_, args, { models }) => {
  try {
    const {
      filter: {
        skip = 0, limit = 10, sortBy = 'fineAmount_ASC', search,
      },
    } = args;
    
    let query = `
    SELECT id, borrow_id, fine_amount FROM public.penalty
    WHERE deleted_at IS NULL
    `;

    if (search) {
      query = `${query} AND (borrow_id '${search}%' OR fine_amount '${search}%')`;
    }

    const countQuery = `SELECT COUNT(*) FROM (${query}) as penaltyCount`;

    // eslint-disable-next-line security/detect-object-injection
    query = `${query} ORDER BY ${sort_mapper[sortBy]} OFFSET ${parseInt(skip, 10)} LIMIT ${parseInt(limit, 10)}`;

    const penalties = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const count = await sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT });

    return {
      penalties,
      count: count[0].count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = penalties;
