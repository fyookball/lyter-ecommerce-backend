const express = require("express");
const router = express.Router();
const storeController = require("../controller/storeController");
const { requireRetailerAuth } = require("../middleWare/authMiddleware");

router.post("/add_store", requireRetailerAuth, storeController.AddStore);

module.exports = router;
