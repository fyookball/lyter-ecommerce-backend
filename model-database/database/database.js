const Sequelize = require("sequelize");

const sequelize = new Sequelize("lyter_shop", "bobapp", "testermain", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

//production
// const Sequelize = require("sequelize");

// //database //username //password
// const sequelize = new Sequelize("specifi4_bank", "specifi4_banke", "bankspassword", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
