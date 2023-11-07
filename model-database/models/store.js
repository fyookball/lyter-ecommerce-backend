const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const store = sequelize.define("store", {
  id: {
    type: Sequelize.DataTypes.UUID, // Specify the data type (e.g., UUID, string, etc.)
    primaryKey: true, // Set this field as the primary key
    autoIncrement: false, // Disable auto-increment
    defaultValue: Sequelize.UUIDV4, // Provide a default value (e.g., UUIDv4)
    allowNull: false, // Make it non-nullable if required
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  revenue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sales: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = store;
