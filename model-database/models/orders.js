const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const orders = sequelize.define("orders", {
  id: {
    type: Sequelize.DataTypes.UUID, // Specify the data type (e.g., UUID, string, etc.)
    primaryKey: true, // Set this field as the primary key
    autoIncrement: false, // Disable auto-increment
    defaultValue: Sequelize.UUIDV4, // Provide a default value (e.g., UUIDv4)
    allowNull: false, // Make it non-nullable if required
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  featuredImage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = orders;
