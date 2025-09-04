// middlewares/errorHandler.js
const { NODE_ENV } = require('../utils/config');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;

  const payload = { message };

  if (NODE_ENV !== 'production') {
    payload.error = { name: err.name, stack: err.stack };
  }

  res.status(status).json(payload);
};