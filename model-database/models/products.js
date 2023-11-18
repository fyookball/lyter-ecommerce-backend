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
    defaultValue: 0
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,  // SET TO TRUE FOR NOW.  ISSUE IS THIS IS BEING SENT AS JSON.
    defaultValue: "0"
  },
  price: {
    type: Sequelize.INTEGER, // Adjust the precision and scale as needed
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER, // Adjust the precision and scale as needed
    allowNull: false,
    defaultValue: 1
  },
  isFeatured: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: " "
  },
  barcode: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "000"
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "unknown status"
  },
});

module.exports = products;
