/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
const moment = require('moment');
const CONFIG = require('../../config/config');
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
    static associate(models) {
    // define association here
    }
  }
  Borrow.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    issueDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    expiryDate: {
      type: DataTypes.DATEONLY
    },
    returnDate: {
      type: DataTypes.DATE
    },
    bookId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },  
  }, {
    sequelize,
    modelName: 'Borrow',
    tableName: 'borrow',
  });
  Borrow.beforeCreate(async (borrow) => {
    borrow.expiryDate = moment(borrow.issueDate).add(7,'days');

  });

  Borrow.associate = models => {

    Borrow.belongsTo(models.User, { as: 'borrowBook', foreignKey: 'userId', targetKey: 'id' });
    Borrow.belongsTo(models.Book, { as: 'books', foreignKey: 'bookId', targetKey: 'id' });
    Borrow.hasOne(models.Penalty, { as: 'penalty', foreignKey: 'borrowId', targetKey: 'id' });
  };

  return Borrow;
};
