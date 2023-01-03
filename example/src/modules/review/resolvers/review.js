/* eslint-disable camelcase */
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const sort_mapper = {
  userId_ASC: 'user_id ASC',
  userId_DESC: 'user_id DESC',
};

const review = async (_, args, { models }) => {
  try {
    const {
      filter: {
        skip = 0, limit = 10, sortBy = 'issueDate_ASC', search,
      },
    } = args;
    
    let query = `
    SELECT id, userId, feedback  FROM public.review
    WHERE deleted_at IS NULL
    `;

    if (search) {
      query = `${query} AND (userId '${search}%' OR feedback '${search}%'')`;
    }

    const countQuery = `SELECT COUNT(*) FROM (${query}) as reviewCount`;

    // eslint-disable-next-line security/detect-object-injection
    query = `${query} ORDER BY ${sort_mapper[sortBy]} OFFSET ${parseInt(skip, 10)} LIMIT ${parseInt(limit, 10)}`;

    const review = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const count = await sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT });

    return {
      review,
      count: count[0].count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = review;
