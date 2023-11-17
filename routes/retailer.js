const express = require("express");
const router = express.Router();
const retailerController = require("../controller/retailerController");
const multer = require("multer");
const { requireRetailerAuth } = require("../middleWare/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(null, originalname);
  },
});

const upload = multer({ storage: storage });

router.get(
  "/get_retailer",
  requireRetailerAuth,
  retailerController.getRetailer
);
router.get(
  "/retailer_orders",
  requireRetailerAuth,
  retailerController.getRetailerOrder
);
router.get(
  "/fufill_retailer_order",
  requireRetailerAuth,
  retailerController.fufillRetailerOrder
);
router.put(
  "/update_retailer",
  requireRetailerAuth,
  upload.single("img_url"),
  retailerController.updateRetailer
);

module.exports = router;
