const { join } = require('path');
const { fileLoader, mergeResolvers, mergeTypes } = require('merge-graphql-schemas');
const { typeDefs: scalarTypeDefs, resolvers: scalarResolvers } = require('graphql-scalars');


const typesArray = [
  ...scalarTypeDefs,
  ...fileLoader(join(__dirname, './**/*.graphql')),
];

const resolverArray = [
  scalarResolvers,
  ...fileLoader(join(__dirname, './**/*.resolvers.*')), 
];

const typeDefs = mergeTypes(typesArray);
const resolvers = mergeResolvers(resolverArray);

module.exports = { typeDefs, resolvers };
