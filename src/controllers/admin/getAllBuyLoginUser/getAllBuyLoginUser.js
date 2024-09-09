const BuyLogin = require('../../../models/buyLogin.js');
const ApiError = require('../../../utills/apiError/apiError.js');

const getAllBuyLoginUser = async (req, res, next) => {
  try {
    const buyLogins = await BuyLogin.find();

    if (!buyLogins.length) {
      return res.status(404).json({
        message: 'No buy logins found',
      });
    }

    res.status(200).json({
      message: 'Buy logins retrieved successfully',
      data: buyLogins,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBuyLoginUser };
