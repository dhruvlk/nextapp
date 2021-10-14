/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
    },
    refreshToken: {
      type: DataTypes.STRING,
      required: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  });

  User.associate = models => {
    
    User.hasMany(models.Borrow, {
      as: 'borrowBook',
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'RESTRICT',
      hooks: true,
    });

    User.hasMany(models.Review, {
      as: 'userReview',
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'RESTRICT',
      hooks: true,
    });

  };

  return User;
};
