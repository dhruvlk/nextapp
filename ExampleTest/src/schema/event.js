'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate({ User, Invite }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
      this.hasMany(Invite, { foreignKey: 'eventId', as: 'invite' })
    }
  };
  Event.init({
    eventname: DataTypes.STRING,
    scheduled: DataTypes.DATE,
    notificationDelay: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'Event', 
  });
  return Event;
};
