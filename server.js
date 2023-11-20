require("dotenv").config();
const express = require("express");
const { requireAuth } = require("./middleWare/authMiddleware");
const auth = require("./routes/auth");
const customer = require("./routes/customer");
const product = require("./routes/product");
const order = require("./routes/order");  
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleErrors } = require("./middleWare/error");
const Logger = require("./middleWare/log");
const Customer = require("./model-database/models/customers");
const Retailer = require("./model-database/models/retailers");
const CustomerOrder = require("./model-database/models/customer_orders");
const RetailerOrder = require("./model-database/models/retailer_order");
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

//const EndpointHead = process.env.EndpointHead;
const EndpointHead = ""; // temporary...- JF

app.use(`${EndpointHead}/auth`, auth);
app.use(`${EndpointHead}/products`, product);
app.use(`${EndpointHead}/customer`, customer);
app.use(`${EndpointHead}/store`, customer);
app.use(`${EndpointHead}/retailer`, customer);
app.use(`${EndpointHead}/orders`, order);

// Error handler middleware
app.use(handleErrors);

//Establishing database relationships

// Retailer-Store Relationship
//Retailer.belongsToMany(Customer, { through: "RetailerCustomer" });
//Customer.belongsToMany(Retailer, { through: "RetailerCustomer" });

// Customer-Order Relationship
Customer.hasMany(CustomerOrder);
CustomerOrder.belongsTo(Customer);
CustomerOrder.hasMany(Store);
//CustomerOrder.hasMany(Store, { foreignKey: "StoreId" });

// Retailer-Product-store Relationship
Retailer.hasMany(Product);
Store.belongsTo(Retailer, { foreignKey: "retailerId" });
Product.belongsTo(Store, { foreignKey: "storeId" });

//Retailer-order, store and products Relationship
RetailerOrder.belongsTo(Customer, { foreignKey: "sustomerId" });
RetailerOrder.belongsTo(Store, { foreignKey: "storeId" });
RetailerOrder.hasMany(CustomerOrder, { foreignKey: "retailerOrderId" });

//Customer-Store relationship
Store.belongsToMany(Customer, { through: "storeCustomer" });
Customer.belongsToMany(Store, { through: "storeCustomer" });

// Customer-Product Relationship through Orders
CustomerOrder.hasMany(Product, { foreignKey: "orderId" });
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
