const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.js');
const userRoutes = require('./userRoutes/user.js');
const adminRoute = require('./adminRoutes/admin.js')

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoute)

module.exports = router;
