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

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

// ✅ importă validators pentru rutele publice
const {
  validateSignup,
  validateSignin,
} = require('./middlewares/validators');

const {
  PORT = 3001,
  MONGODB_URI = 'mongodb://127.0.0.1:27017/wtwr_db',
  NODE_ENV,
} = process.env;

const app = express();

mongoose
  .connect(MONGODB_URI)
  // eslint-disable-next-line no-console
  .then(() => console.log('✅ Connected to MongoDB'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(cors());

app.use(requestLogger);

// >>> Sprint 15 crash-test (plasat ÎNAINTE de /signin și /signup)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
// <<<

// ✅ aplică validările celebrate pe rutele publice
app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

// rute de resurse (presupun auth în routerele respective)
app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

// 404 pentru rutele neacoperite
app.use((req, res, next) => next(new NotFoundError('Requested resource not found')));

// log de erori + handlers
app.use(errorLogger);
app.use(celebrateErrors()); // transformă erorile celebrate în 400 coerente
app.use(errorHandler);

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 App listening at http://localhost:${PORT}`);
  });
}

module.exports = app;