// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors: celebrateErrors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');

const { requestLogger, errorLogger } = require('./middlewares/logger'); // asigură-te că există
const errorHandler = require('./middlewares/errorHandler');             // asigură-te că există
const NotFoundError = require('./errors/NotFoundError');                // asigură-te că există

const {
  PORT = 3001,
  MONGODB_URI = 'mongodb://127.0.0.1:27017/wtwr_db',
  NODE_ENV,
} = process.env;

const app = express();

// --- DB ---
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- Security / hardening ---
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// --- Parsers & CORS ---
app.use(express.json());
app.use(cors());

// --- Logging: requests ---
app.use(requestLogger);

// --- Public routes ---
app.post('/signup', createUser);
app.post('/signin', login);

// --- Protected routes (router-ul de users aplică `auth` în interior) ---
app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

// --- 404 fallthrough ---
app.use((req, res, next) => next(new NotFoundError('Requested resource not found')));

// --- Logging: errors ---
app.use(errorLogger);

// --- Celebrate/Joi errors (400) ---
app.use(celebrateErrors());

// --- Centralized error handler (ULTIMUL) ---
app.use(errorHandler);

// --- Start server (nu porni în test) ---
if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 App listening at http://localhost:${PORT}`);
  });
}

// export pentru SuperTest/Jest
module.exports = app;