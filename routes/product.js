const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');



router.get('/', productController.getProducts);

router.post('/bought', productController.boughtProduct);



module.exports = router;