/* eslint-disable camelcase */
const logger = require('../../../logger');
const { sequelize } = require('../../../models');

const sort_mapper = {
  bookName_ASC: 'book_name ASC',
  bookName_DESC: 'book_name DESC',
  bookAuthor_ASC: 'book_author ASC',
  bookAuthor_DESC: 'book_author DESC',
};

const books = async (_, args, { models }) => {
  try {
    const {
      filter: {
        skip = 0, limit = 10, sortBy = 'bookName_ASC', search,
      },
    } = args;
    const {
      // eslint-disable-next-line no-unused-vars
      User: UserModel,
    } = models;

    let query = `
    SELECT id, book_name, book_author, book_edition  FROM public.book
    WHERE deleted_at IS NULL
    `;

    if (search) {
      query = `${query} AND (book_name iLike '${search}%' OR book_author iLike '${search}%' OR book_edition iLike '${search}%')`;
    }

    const countQuery = `SELECT COUNT(*) FROM (${query}) as booksCount`;

    // eslint-disable-next-line security/detect-object-injection
    query = `${query} ORDER BY ${sort_mapper[sortBy]} OFFSET ${parseInt(skip, 10)} LIMIT ${parseInt(limit, 10)}`;

    const books = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const count = await sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT });

    return {
      books,
      count: count[0].count,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = books;
