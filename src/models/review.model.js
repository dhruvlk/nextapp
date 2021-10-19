/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
    static associate(models) {
    // define association here
    }
  }
  Review.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      required: true,
    },
    bookId: {
      type: DataTypes.UUID,
      required: true,
    },
    feedback: {
      type: DataTypes.STRING,
      required: true,
     },
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'review',
  });

  Review.associate = models => {
    Review.belongsTo(models.User, { as: 'userReview', foreignKey: 'userId', targetKey: 'id' });
    Review.belongsTo(models.Book, { as: 'bookReview', foreignKey: 'bookId', targetKey: 'id' });
  };

  return Review;
};
