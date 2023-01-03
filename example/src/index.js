/* eslint-disable no-console */
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const createGraphQLLogger = require('graphql-log');
const Sentry = require('@sentry/node');
const { sequelize } = require('./models');
const { models } = require('./models');
const bootFiles = require('./boot');
const { resolvers, typeDefs } = require('./modules');
const { directiveResolvers } = require('./directives/auth-directive');
const logger = require('./logger');
const CONFIG = require('../config/config');
const packageJson = require('../package.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const logExecutions = createGraphQLLogger({
  logger: logger.info,
});

logExecutions(resolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
});

Sentry.init({
  dsn: CONFIG.sentry || '',
  environment: CONFIG.env || 'development',
  release: '1.0.1',
});

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  formatError: error => {
    // Enable Sentry to capture error
    Sentry.captureException(error)
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ctx => ({
    req: ctx.req,
    res: ctx.res,
    models,
  }),

});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);

app.get('/version', (req, res) => {
  res.json({
    version: packageJson.version,
  });
});

sequelize.sync().then(async () => {
  httpServer.listen(CONFIG.port, () => {
    console.log(`🚀 Server ready at http://localhost:${CONFIG.port}/graphql`);
  });

  // ON BOOT
  bootFiles(models);
  return true;
}).catch(error => error);

module.exports = app;
