const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Controllers pentru autentificare
const { createUser, login } = require('./controllers/users');

// Middleware pentru autentificare
const auth = require('./middlewares/auth');

// Rute
const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');

// Coduri de eroare
const {
  NOT_FOUND,
  SERVER_ERROR,
} = require('./utils/errors');

const { PORT = 3001 } = process.env;
const app = express();

// 🔌 Conectare MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 🔧 Middleware-uri globale
app.use(express.json());
app.use(cors()); // activează CORS pentru frontend

// 🔓 Rute publice
app.post('/signup', createUser);
app.post('/signin', login);

// 🔐 Middleware pentru autentificare — de aici încolo `req.user` este disponibil
app.use(auth);

// 🔐 Rute protejate
app.use('/items', clothingItemsRouter);
app.use('/users', usersRouter);

// ❌ Rute inexistente
app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: 'Requested resource not found' });
});

// 💥 Global error handler pentru erori neprevăzute
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled error:', err);
  res.status(SERVER_ERROR).json({ message: 'Unhandled server error' });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
});
