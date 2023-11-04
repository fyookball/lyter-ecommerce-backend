const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/get_products", productController.getProducts);

router.post("/buy_product", productController.boughtProduct);

module.exports = router;
