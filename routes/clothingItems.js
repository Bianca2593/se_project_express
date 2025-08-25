// routes/clothingItems.js
const express = require('express');

const router = express.Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothingItems');

const auth = require('../middlewares/auth');
const {
  validateItemCreate,
  validateItemIdParam,
} = require('../middlewares/validators');

// GET poate rămâne public, cum ai acum:
router.get('/', getItems);

// de aici în jos, toate rutele protejate:
router.use(auth);

router.post('/', validateItemCreate, createItem);
router.delete('/:itemId', validateItemIdParam, deleteItem);
router.put('/:itemId/likes', validateItemIdParam, likeItem);
router.delete('/:itemId/likes', validateItemIdParam, unlikeItem);

module.exports = router;