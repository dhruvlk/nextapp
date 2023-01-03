const Sequelize = require('sequelize');
const { sequelize, models } = require('../src/models');

// The export object must be a dictionary of model names -> models
// It must also include sequelize (instance) and Sequelize (constructor) properties
module.exports = {
  Sequelize,
  sequelize,
  ...models,
};
