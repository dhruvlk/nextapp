/* eslint-disable camelcase */
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const sort_mapper = {
  issueDate_ASC: 'issue_date ASC',
  issueDate_DESC: 'issue_date DESC',
  expiryDate_ASC: 'expiry_date ASC',
  expiryDate_DESC: 'expiry_date DESC',
};

const borrows = async (_, args, { models }) => {
  try {
    const {
      filter: {
        skip = 0, limit = 10, sortBy = 'issueDate_ASC', search,
      },
    } = args;
    
    let query = `
    SELECT id, issue_date, expiry_date, return_date,user_id,book_id  FROM public.borrow
    WHERE deleted_at IS NULL
    `;

    if (search) {
      query = `${query} AND (issue_date '${search}%' OR expiry_date '${search}%' OR user_id '${search}%' OR book_id '${search}%')`;
    }

    const countQuery = `SELECT COUNT(*) FROM (${query}) as borrowCount`;

    // eslint-disable-next-line security/detect-object-injection
    query = `${query} ORDER BY ${sort_mapper[sortBy]} OFFSET ${parseInt(skip, 10)} LIMIT ${parseInt(limit, 10)}`;

    const borrows = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const count = await sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT });

    return {
      borrows,
      count: count[0].count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = borrows;
