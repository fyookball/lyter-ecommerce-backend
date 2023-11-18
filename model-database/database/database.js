// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("lyter_shop", "bobapp", "testermain", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

//production
const Sequelize = require("sequelize");

//database specifi4_lyter  //username specifi4_lyter_db_user //password lyterinc3
const sequelize = new Sequelize(
  "lityer_local",
  "lityer_user",
  "xxx",
  {
    dialect: "mysql",
    host: "localhost",
    logging: console.log  //for debugging.
  }
);

module.exports = sequelize;
