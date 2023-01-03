'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Event, Invite }) {
      this.hasMany(Event, { foreignKey: 'userId', as: 'event' }),
        this.hasMany(Invite, { foreignKey: 'userId', as: 'invite' })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    webhookLink: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
