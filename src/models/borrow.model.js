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
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: true,
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: true,
    },
    bookId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false,
    },
    fineAmount: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue : "NoFine",
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Borrow',
    tableName: 'borrow',
  });

  Borrow.beforeCreate(async (borrow) => {
    borrow.expiryDate = moment(borrow.issueDate).add(7,'days');
    if(moment(borrow.expiryDate).isBefore(moment(borrow.returnDate).add(0,'days')))
    {
        borrow.fineAmount = CONFIG.fine;
        if(borrow.fineAmount = CONFIG.fine)
        {
          borrow.status = "unpaid"
        }
    }
    if(!moment(borrow.expiryDate).isBefore(moment(borrow.returnDate).add(0,'days')))
    {
        borrow.fineAmount = 0;
    }
  });

  Borrow.associate = models => {

    Borrow.belongsTo(models.User, { as: 'borrowBook', foreignKey: 'userId', targetKey: 'id' });
    Borrow.belongsTo(models.Book, { as: 'books', foreignKey: 'bookId', targetKey: 'id' });
  };

  return Borrow;
};
