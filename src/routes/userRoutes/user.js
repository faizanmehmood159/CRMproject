const express = require('express');
const multer = require('multer');
const path = require('path');


const { addBuyLogin } = require('../../controllers/user/buyLogin/addBuyLogin.js');
const { setPassword } = require('../../controllers/user/userSetPassword/setPassword.js');



const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));


//Post API's
router.post('/addBuyLogin', upload.fields([{ name: 'image' }]),  addBuyLogin);
router.post('/setpassword', setPassword);


module.exports = router;
