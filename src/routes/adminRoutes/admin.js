const express = require('express');
const multer = require('multer');
const path = require('path');

const { getAllBuyLoginUser } = require('../../controllers/admin/getAllBuyLoginUser/getAllBuyLoginUser.js');


const { updateBuyLoginStatus } = require('../../controllers/admin/updateBuyLoginStatus/updateBuyLoginStatus .js');


const router = express.Router();

//Post APIs
router.post('/updateBuyLoginStatus/:id', updateBuyLoginStatus);


// Get APIs
router.get('/getAllBuyLoginUser', getAllBuyLoginUser);

module.exports = router;
