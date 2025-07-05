const express = require('express');
const mongoose = require('mongoose');

// Importă rutele
const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');

// Coduri de eroare
const { NOT_FOUND } = require('./utils/errors');

const { PORT = 3001 } = process.env;
const app = express();

// Conectare MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware pentru citirea corpului cererii
app.use(express.json());

// Middleware temporar de autorizare
app.use((req, res, next) => {
  req.user = { _id: '6862e0abbd1b3357d766a321' }; // ← înlocuiește cu un user real existent
  next();
});

// Rute
app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

// 404 pentru resurse inexistente
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

// Pornire server
app.listen(PORT, () => {
  console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
});
