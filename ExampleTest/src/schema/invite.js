'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invite extends Model {
    static associate({ User, Event }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' }),
        this.belongsTo(Event, { foreignKey: 'eventId', as: 'event' })
    }
  };
  Invite.init({
    inviteduserid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invite',
  });
  return Invite;
};