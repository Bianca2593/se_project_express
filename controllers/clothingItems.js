// controllers/clothingItems.js
const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// GET /items
module.exports.getItems = (req, res, next) => (
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch(next)
);

// POST /items
module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user?._id;

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid item data'));
      }
      return next(err);
    });
};

// DELETE /items/:itemId
module.exports.deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.isValidObjectId(itemId)) {
    return next(new BadRequestError('Invalid item id'));
  }

  return ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => {
      if (String(item.owner) !== String(req.user?._id)) {
        throw new ForbiddenError('You can only delete your own items');
      }
      return item.deleteOne();
    })
    .then(() => res.status(200).json({ message: 'Item deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
};

// PUT /items/:itemId/likes
module.exports.likeItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.isValidObjectId(itemId)) {
    return next(new BadRequestError('Invalid item id'));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
};

// DELETE /items/:itemId/likes
module.exports.dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.isValidObjectId(itemId)) {
    return next(new BadRequestError('Invalid item id'));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user?._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.status(200).json(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
};