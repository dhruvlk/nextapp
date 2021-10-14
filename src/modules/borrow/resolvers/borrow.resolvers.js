const borrows = require('./borrows');
const createBorrow = require('./create-borrow');
const deleteBorrow = require('./delete-borrow');
const updateBorrow = require('./update-borrow');

const resolvers = {
 
  BorrowListing: {
    issueDate: {
      resolve: BorrowListing => BorrowListing.issueDate,
    },
    returnDate: {
      resolve: BorrowListing => BorrowListing.returnDate,
    },
    expiryDate: {
      resolve: BorrowListing => BorrowListing.expiryDate,
    },
    fineAmount: {
      resolve: BorrowListing => BorrowListing.fineAmount,
    }
    
  },
  Query: {
    borrows
  },
  Mutation: {
    createBorrow,
    deleteBorrow,
    updateBorrow,
  },
};

module.exports = resolvers;
