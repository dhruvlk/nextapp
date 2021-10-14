/* eslint-disable no-unused-vars */
const review = require('./review');
const createReview = require('./create-review');

const resolvers = {

  Query: {
    review,
  },
  Mutation: {
    createReview,
  },
  
};

module.exports = resolvers;
