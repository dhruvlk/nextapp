/* eslint-disable camelcase */
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const sort_mapper = {
  firstName_ASC: 'first_name ASC',
  firstName_DESC: 'first_name DESC',
  lastName_ASC: 'last_name ASC',
  lastName_DESC: 'last_name DESC',
};

const users = async (_, args, { models }) => {
  try {
    const {
      filter: {
        skip = 0, limit = 10, sortBy = 'firstName_ASC', search,
      },
    } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      User: UserModel,
    } = models;

    let query = `
    SELECT id, first_name, last_name, email, role FROM public.user
    WHERE deleted_at IS NULL
    `;

    if (search) {
      query = `${query} AND (first_name iLike '${search}%' OR last_name iLike '${search}%' OR email iLike '${search}%')`;
    }

    const countQuery = `SELECT COUNT(*) FROM (${query}) as usersCount`;

    // eslint-disable-next-line security/detect-object-injection
    query = `${query} ORDER BY ${sort_mapper[sortBy]} OFFSET ${parseInt(skip, 10)} LIMIT ${parseInt(limit, 10)}`;

    const users = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const count = await sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT });

    return {
      users,
      count: count[0].count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = users;
