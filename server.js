require("dotenv").config();
const express = require("express");
const { requireAuth } = require("./middleWare/authMiddleware");
const auth = require("./routes/auth");
const customer = require("./routes/customer");
const product = require("./routes/product");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleErrors } = require("./middleWare/error");
const Logger = require("./middleWare/log");
const Customer = require("./model-database/models/customers");
const Retailer = require("./model-database/models/retailers");
const Order = require("./model-database/models/orders");
const Product = require("./model-database/models/products");
const Category = require("./model-database/models/category");
const Store = require("./model-database/models/store");
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
app.use(`${EndpointHead}/auth`, auth);
app.use(`${EndpointHead}/products`, product);
app.use(`${EndpointHead}/customer`, customer);

// Error handler middleware
app.use(handleErrors);

//Establishing database relationships

// Retailer-Store Relationship
//Retailer.belongsToMany(Customer, { through: "RetailerCustomer" });
//Customer.belongsToMany(Retailer, { through: "RetailerCustomer" });

// Customer-Order Relationship
Customer.hasMany(Order);
Order.belongsTo(Customer);

// Retailer-Product-store Relationship
Retailer.hasMany(Product);
Store.belongsTo(Retailer, { foreignKey: "retialerId" });
Product.belongsTo(Store, { foreignKey: "storeId" });

//Customer-Store relationship
Store.belongsToMany(Customer, { through: "StoreCustomer" });
Customer.belongsToMany(Store, { through: "StoreCustomer" });

// Customer-Product Relationship through Orders
Order.hasMany(Product, { foreignKey: "orderId" });
// Product.belongsToMany(Order, { through: "OrderProduct" });
// Order.belongsToMany(Product, { through: "OrderProduct" });

//Category to product relationship
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

// sequelize sync //ini my database
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
