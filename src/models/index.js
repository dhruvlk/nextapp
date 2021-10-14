/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-object-injection */
const Sequelize = require('sequelize');
const operatorsAliases = require('./sequelize-operators-aliases');
const user = require('./user.model');
const book = require('./book.model');
const borrow = require('./borrow.model');
const review = require('./review.model');
const CONFIG = require('../../config/config');

let sequelize;
if (CONFIG.postgres) {
  sequelize = new Sequelize(CONFIG.postgres, {
    dialect: 'postgres',
    operatorsAliases,
    logging: false,
    // Specify options, which are used when sequelize.define is called.
    define: {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  });
} else {
  sequelize = new Sequelize(
    Object.assign(CONFIG, {
      operatorsAliases,
      logging: false,
      // Specify options, which are used when sequelize.define is called.
      define: {
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        paranoid: true,
      },
    }),
  );
}

user(sequelize, Sequelize.DataTypes);
book(sequelize, Sequelize.DataTypes);
borrow(sequelize, Sequelize.DataTypes);
review(sequelize, Sequelize.DataTypes);

const { models } = sequelize;

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };
