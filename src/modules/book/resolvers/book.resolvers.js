const books = require('./books');
const createBook = require('./create-book');
const updateBook = require('./update-book');
const deleteBook = require('./delete-book');

const resolvers = {
  BookListing: {
    bookName: {
      resolve: BookListing => BookListing.book_name,
    },
    bookAuthor: {
      resolve: BookListing => BookListing.book_author,
    },
  },
  Query: {
    books,
  },
  Mutation: {
    createBook,
    updateBook,
    deleteBook
  },
};

module.exports = resolvers;
