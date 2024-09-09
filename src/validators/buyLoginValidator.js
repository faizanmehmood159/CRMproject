const { body } = require('express-validator');


const validateBuyLogin = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required'),

  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d{11}$/)
    .withMessage('Phone number must be exactly 11 digits'),

  body('image')
    .custom((value, { req }) => {
      if (!req.files || !req.files['image']) {
        throw new Error('Image is required');
      }
      return true;
    })
];

module.exports = { validateBuyLogin };
