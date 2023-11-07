const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const products = sequelize.define("products", {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  countInStock: {
    type: Sequelize.INTEGER, // Use INTEGER for whole numbers
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER, // Adjust the precision and scale as needed
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER, // Adjust the precision and scale as needed
    allowNull: false,
  },
  isFeatured: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = products;