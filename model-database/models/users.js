const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const users = sequelize.define("users", {
  id: {
    type: Sequelize.DataTypes.UUID, // Specify the data type (e.g., UUID, string, etc.)
    primaryKey: true, // Set this field as the primary key
    autoIncrement: false, // Disable auto-increment
    defaultValue: Sequelize.UUIDV4, // Provide a default value (e.g., UUIDv4)
    allowNull: false, // Make it non-nullable if required
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  account_status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  balanceUsdc: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  balanceUsdt: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = users;
