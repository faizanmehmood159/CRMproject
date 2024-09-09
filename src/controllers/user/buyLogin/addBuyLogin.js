const BuyLogin = require('../../../models/buyLogin.js');
const ApiError = require('../../../utills/apiError/apiError.js');
const { validationResult } = require('express-validator');
require('dotenv').config();

const addBuyLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Validation failed', true, '', errors.array());
    }

    const { fullName, phoneNumber } = req.body;
    const baseUrl = process.env.BASE_URL1;

    if (!baseUrl) {
      throw new ApiError(500, 'Base URL is not defined in environment variables');
    }

    const existingEntry = await BuyLogin.findOne({ phoneNumber });
    if (existingEntry) {
      return res.status(400).json({
        message: 'A user with this phone number already exists',
      });
    }

    const imagePath = req.files && req.files['image']
      ? `${baseUrl}/uploads/${req.files['image'][0].filename}`
      : null;

    const newBuyLogin = new BuyLogin({
      fullName,
      phoneNumber,
      image: imagePath,
      status: 'pending',
    });

    await newBuyLogin.save();

    res.status(201).json({
      message: 'Buy login entry created successfully',
      data: newBuyLogin,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addBuyLogin };
