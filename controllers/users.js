const mongoose = require('mongoose');
const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/errors');

// Creează un user nou
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  console.log('📦 Body primit:', req.body); // Debug body

  return User.create({ name, avatar })
    .then((user) => {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      console.error('❌ Eroare la createUser:', err.name, err.message);
      console.error(err); // Log complet

      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Invalid user data' });
      }
      return res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server' });
    });
};

// Obține toți userii
module.exports.getUsers = (req, res) => {
  return User.find({})
    .then((users) => {
      const formattedUsers = users.map((user) => ({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      }));
      return res.status(200).json(formattedUsers);
    })
    .catch((err) => {
      console.error('❌ Eroare la getUsers:', err);
      return res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server' });
    });
};

// Obține un user după ID
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid user ID' });
  }

  return User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND).json({ message: 'User not found' });
      }
      console.error('❌ Eroare la getUser:', err);
      return res.status(SERVER_ERROR).json({ message: 'An error has occurred on the server' });
    });
};