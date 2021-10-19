/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
const moment = require('moment');
const CONFIG = require('../../config/config');
module.exports = (sequelize, DataTypes) => {
  class Penalty extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
    static associate(models) {
    // define association here
    }
  }
  Penalty.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    borrowId: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },
    fineAmount: {
        type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Penalty',
    tableName: 'penalty',
  });
  
Penalty.associate = (models) => {
    Penalty.belongsTo(models.Borrow, { foreignKey: 'borrowId', as:'penalty' });
};

  return Penalty;
};
