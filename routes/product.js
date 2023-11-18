 
const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
  
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  console.log('Request Body:', req.body);
  next();  
});

router.get("/get_products", productController.getProducts);
router.post("/buy_product", productController.boughtProduct);
router.post("/add_product", productController.addProduct);

module.exports = router;

