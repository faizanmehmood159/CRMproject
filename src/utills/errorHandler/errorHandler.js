const ApiError = require('./apiError');

const handleError = (err, res) => {
  const { statusCode, message, errors } = err;

  res.status(statusCode || 500).json({
    status: 'error',
    statusCode: statusCode || 500,
    message: message || 'Internal Server Error',
    errors: errors || [], 
  });
};

const notFound = (req, res, next) => {
  const err = new ApiError(404, 'Resource not found');
  next(err);
};

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return handleError(err, res);
  }

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error',
  });
};

module.exports = {
  notFound,
  globalErrorHandler,
};
