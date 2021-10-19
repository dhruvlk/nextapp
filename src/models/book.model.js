/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
    static associate(models) {
    // define association here
    }
  }
  Book.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    bookName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    bookAuthor: {
      type: DataTypes.STRING,
      required: true,
      allowNull: true,
    },
    bookEdition: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    noOfCopies: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'book',
  });

  Book.associate = models => {
    Book.hasMany(models.Borrow, {
      as: 'books',
      foreignKey: 'bookId',
      sourceKey: 'id',
      onDelete: 'RESTRICT',
      hooks: true,
    });

    Book.hasMany(models.Review, {
      as: 'bookReview',
      foreignKey: 'bookId',
      sourceKey: 'id',
      onDelete: 'RESTRICT',
      hooks: true,
    });
  
  };

 
  return Book;
};
