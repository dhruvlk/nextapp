const borrows = require('./borrows');
const createBorrow = require('./create-borrow');
const returnBook = require('./return-borrow-book');
const payFine = require('./penalty');
const penalties = require('./penalties')

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
    
  },

  PenaltyListing: {
    fineAmount: {
      resolve: PenaltyListing => PenaltyListing.fineAmount,
    },
    borrowId: {
      resolver: PenaltyListing => PenaltyListing.borrowId
    }
  },

  Query: {
    borrows,
    penalties
  },
  Mutation: {
    createBorrow,
    returnBook,
    payFine
  },
};

module.exports = resolvers;
