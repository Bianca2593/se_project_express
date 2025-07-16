const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
} = require('../utils/errors');

// Creează un user nou (signup)
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  console.log('📦 Body primit:', req.body);

  if (!email || !password) {
    return res.status(BAD_REQUEST).json({ message: 'Email and password are required' });
  }

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
        name,
        avatar,
        email,
        password: hash,
      }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      return res.status(201).json(userWithoutPassword);
    })
    .catch((err) => {
      console.error('❌ Eroare la createUser:', err.name, err.message);

      if (err.code === 11000) {
        return res.status(CONFLICT).json({ message: 'Email already exists' });
      }

      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Invalid user data', details: err.message });
      }

      return res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server' });
    });
};

// Autentificare user (signin)
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).json({ message: 'Email and password are required' });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => {
      console.error('❌ Eroare la login:', err.message);
      return res.status(UNAUTHORIZED).json({ message: 'Incorrect email or password' });
    });
};

// Obține userul curent (autentificat)
module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).json({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND).json({ message: 'User not found' });
      }
      console.error('❌ Eroare la getCurrentUser:', err);
      return res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server' });
    });
};

// Actualizează datele userului curent
module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((updatedUser) => res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        email: updatedUser.email,
      }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND).json({ message: 'User not found' });
      }
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Invalid user data' });
      }
      console.error('❌ Eroare la updateUser:', err);
      return res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server' });
    });
};