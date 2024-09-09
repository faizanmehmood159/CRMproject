const bcrypt = require('bcrypt');
const UserLogin = require('../../../models/userLogin.js');
const ApiError = require('../../../utills/apiError/apiError.js');
const { generateToken } = require('../../../middlewares/authenticationToken.js');

const logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, 'Username and password are required');
    }

    const user = await UserLogin.findOne({ username });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(user);
  
    console.log('Generated Token:', token);

    res.status(200).json({
      message: 'Login successful',
      authenticationToken: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { logIn };
