const jwt = require('jsonwebtoken');
const ApiError = require('../utills/apiError/apiError');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; 

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: '30d', 
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'] || req.headers['auth-token']; 

  if (!token) {
    return next(new ApiError(401, 'No token provided'));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(401, 'Invalid token'));
    }

    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };
