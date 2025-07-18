const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Controllers pentru autentificare
const { createUser, login } = require('./controllers/users');

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

// 🧠 Middleware securitate
app.use(helmet());

// ⏳ Limitare număr cereri/IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100, // max 100 requests per IP
});
app.use(limiter);

// 🔧 Middleware-uri globale
app.use(express.json());
app.use(cors()); // activează CORS pentru frontend

// 🔓 Rute publice
app.post('/signup', createUser);
app.post('/signin', login);

// 🔐 Rute protejate (auth este mutat direct în fișierele de rutare)
app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

// ❌ Rute inexistente
app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: 'Requested resource not found' });
});

// 💥 Handler global pentru erori neprevăzute (opțional până în Sprint 15)
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled error:', err);
  res.status(SERVER_ERROR).json({ message: 'Unhandled server error' });
});

// 🚀 Pornire server
app.listen(PORT, () => {
  console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
});
