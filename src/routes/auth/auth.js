const express = require('express');
const { signIn } = require('../../controllers/auth/admin/singIn.js');
const { logIn } = require('../../controllers/auth/user/logIn.js');

const router = express.Router();

router.post("/signIn", signIn)
router.post("/login", logIn)



module.exports = router;