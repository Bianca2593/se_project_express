const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} = require('../utils/errors');

// GET /items
module.exports.getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch(() => res.status(SERVER_ERROR).json({ message: 'Internal server error' }));

// POST /items
module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Invalid item data' });
      }
      return res.status(SERVER_ERROR).json({ message: 'Internal server error' });
    });
};

// DELETE /items/:itemId
module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid item ID' });
  }

  return ClothingItem.findById(itemId)
    .orFail(() => new Error('NotFound'))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res.status(FORBIDDEN).json({ message: 'Forbidden: Not your item' });
      }

      return item.deleteOne().then(() => res.status(200).json(item));
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND).json({ message: 'Item not found' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).json({ message: 'Invalid item ID format' });
      }
      return res.status(SERVER_ERROR).json({ message: 'Internal server error' });
    });
};

// PUT /items/:itemId/likes
module.exports.likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid item ID' });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND).json({ message: 'Item not found' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).json({ message: 'Invalid item ID format' });
      }
      return res.status(SERVER_ERROR).json({ message: 'Internal server error' });
    });
};

// DELETE /items/:itemId/likes
module.exports.unlikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid item ID' });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('NotFound'))
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND).json({ message: 'Item not found' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).json({ message: 'Invalid item ID format' });
      }
      return res.status(SERVER_ERROR).json({ message: 'Internal server error' });
    });
};
