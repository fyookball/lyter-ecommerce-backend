const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const customer_orders = sequelize.define("customer_orders", {
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
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  channel: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "Website",
  },
  payment: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "Awaits payments",
  },
  fufilled: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "Awaits fufillment",
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = customer_orders;
