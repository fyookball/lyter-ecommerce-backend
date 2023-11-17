const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { requireRetailerAuth } = require("../middleWare/authMiddleware");

router.get("/get_products", productController.getProducts);
router.get("/get_product/:product_id", productController.getParticularProducts);
router.post("/buy_product", productController.boughtProduct);

router.post("/add_product", requireRetailerAuth, productController.AddProducts);

module.exports = router;
