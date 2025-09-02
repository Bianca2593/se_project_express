const CustomError = require('./CustomError');

class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

module.exports = BadRequestError;