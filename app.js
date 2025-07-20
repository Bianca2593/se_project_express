const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { createUser, login } = require('./controllers/users');

const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');

const { NOT_FOUND } = require('./utils/errors');

const { PORT = 3001 } = process.env;
const app = express();

// Conectare MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {}) // console.log eliminat pentru lint
  .catch(() => {}); // console.error eliminat pentru lint

// Middleware securitate
app.use(helmet());

// Limitare număr cereri/IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Middleware-uri globale
app.use(express.json());
app.use(cors());

// Rute publice
app.post('/signup', createUser);
app.post('/signin', login);

// Rute protejate
app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

// Rute inexistente
app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: 'Requested resource not found' });
});

// Pornire server
app.listen(PORT, () => {});
