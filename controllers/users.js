const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');

// clase de erori centralizate
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

// Creează un user nou (signup)
module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Email and password are required'));
  }

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      // nu expune parola
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).json(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Email already exists'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid user data'));
      }
      return next(err);
    });
};

// Autentificare user (signin)
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Email and password are required'));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token });
    })
    .catch((err) => {
      // dacă metoda ta aruncă o eroare custom pentru credentiale greșite,
      // normalizeaz-o aici într-un UnauthorizedError
      if (err.message === 'Unauthorized' || err.name === 'UnauthorizedError') {
        return next(new UnauthorizedError('Incorrect email or password'));
      }
      return next(err);
    });
};

// Obține userul curent (autentificat)
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user?._id;

  return User.findById(userId)
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => res.status(200).json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid user id'));
      }
      return next(err);
    });
};

// Actualizează datele userului curent
module.exports.updateUser = (req, res, next) => {
  const userId = req.user?._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('User not found'))
    .then((updatedUser) => res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid user data'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid user id'));
      }
      return next(err);
    });
};