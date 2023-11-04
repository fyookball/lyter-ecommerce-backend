require("dotenv").config();
const express = require("express");
const { requireAuth } = require("./middleWare/authMiddleware");
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleErrors } = require("./middleWare/error");
const Logger = require("./middleWare/log");
const User = require("./model-database/models/users");
const Orders = require("./model-database/models/orders");
const Products = require("./model-database/models/products");
const Category = require("./model-database/models/category");
const sequelize = require("./model-database/database/database");

const app = express();

//parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Logger middleware
app.use(Logger.logRequest);

// app.get("/", function (req, res) {
//   res.send("welcome");
// });

const EndpointHead = process.env.EndpointHead;
// app.use(`/signup`, signup);
// app.use(`/login`, login);
app.use(`${EndpointHead}/auth`, auth);
app.use(`${EndpointHead}/products`, product);
app.use(`${EndpointHead}/user`, user);

// Error handler middleware
app.use(handleErrors);

//ini my database

//database relationship
User.hasMany(Orders);
Products.hasMany(Category);
Orders.hasMany(Products);

// sequelize sync
sequelize
  .sync()
  // .sync()
  .then((result) => {
    //console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, function () {
  console.log("App is Listening http://localhost:8000");
});
