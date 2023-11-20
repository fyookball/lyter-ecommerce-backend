const express = require("express");
const router = express.Router();
const ordersController = require("../controller/ordersController");

router.post("/add_order", ordersController.addOrder);

module.exports = router;

