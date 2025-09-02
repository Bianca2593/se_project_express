// utils/config.js
require('dotenv').config();

const {
  NODE_ENV = 'development',
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/wtwr',
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URL,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};