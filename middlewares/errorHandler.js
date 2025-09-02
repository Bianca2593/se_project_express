// middlewares/errorHandler.js
const { NODE_ENV } = require('../utils/config');

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  let status = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Dacă nu s-a setat un statusCode explicit pe eroare, normalizează după tip
  if (!err.statusCode) {
    if (err.name === 'ValidationError') {
      status = 400;
      message = 'Invalid request data';
    } else if (err.name === 'CastError') {
      status = 400;
      message = 'Invalid id';
    } else if (err.code === 11000) {
      status = 409;
      message = 'Duplicate key error';
    } else if (err.name === 'JsonWebTokenError') {
      status = 401;
      message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
      status = 401;
      message = 'Token expired';
    }
  }

  // Mesaj generic pentru 500
  if (status === 500) {
    message = 'Internal Server Error';
  }

  const payload = { message };

  // În dev, oferă câteva detalii utile pentru debug
  if (NODE_ENV !== 'production') {
    payload.error = {
      name: err.name,
      stack: err.stack,
    };
    // mesaje de validare Mongoose, dacă există
    if (err.errors && typeof err.errors === 'object') {
      payload.validation = Object.values(err.errors).map((e) => e.message);
    }
  }

  res.status(status).json(payload);
};