const express = require("express");
const router = express.Router();
const userController = require("../controller/customerController");
const multer = require("multer");
const { requireCustomerAuth } = require("../middleWare/authMiddleware");

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

router.post(
  "/",
  requireCustomerAuth,
  upload.single("img_url"),
  userController.updateCustomer
);

router.post("/topup", requireCustomerAuth, userController.topUp);

module.exports = router;
