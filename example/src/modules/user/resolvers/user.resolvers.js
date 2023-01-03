const user = require('./user');
const users = require('./users');
const createUser = require('./create-user');
const login = require('./login');
const updateUser = require('./update');
const updatePassword = require('./update-password');
const verifyUser = require('./verify-user');
const adminUpdate = require('./admin-update');

const resolvers = {
  UserListing: {
    firstName: {
      resolve: UserListing => UserListing.first_name,
    },
    lastName: {
      resolve: UserListing => UserListing.last_name,
    },
    phoneNo: {
      resolve: UserListing => UserListing.phone_no,
    },
  },
  Query: {
    user,
    users,
  },
  Mutation: {
    createUser,
    login,
    updateUser,
    updatePassword,
    verifyUser,
    adminUpdate,
  },
};

module.exports = resolvers;
