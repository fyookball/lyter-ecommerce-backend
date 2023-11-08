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
  "specifi4_lyter",
  "specifi4_lyter_db_user",
  "lyterinc3",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
