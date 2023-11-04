const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const multer  = require('multer');
const {requireAuth} = require('../middleWare/authMiddleware');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const { originalname} = file;
      cb(null, originalname);
    }
  })
  
  const upload = multer({ storage: storage })



router.post('/',  requireAuth, upload.single('img_url'), userController.updateUser);

router.post('/topup',  requireAuth, userController.topUp);


module.exports = router;