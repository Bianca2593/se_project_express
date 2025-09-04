// routes/clothingItems.js
const express = require('express');

const router = express.Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem, 
} = require('../controllers/clothingItems');

const auth = require('../middlewares/auth');
const {
  validateItemCreate,
  validateItemIdParam,
} = require('../middlewares/validators');

// GET public
router.get('/', getItems);


router.use(auth);

router.post('/', validateItemCreate, createItem);
router.delete('/:itemId', validateItemIdParam, deleteItem);
router.put('/:itemId/likes', validateItemIdParam, likeItem);
router.delete('/:itemId/likes', validateItemIdParam, dislikeItem); 

module.exports = router;