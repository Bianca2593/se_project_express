const express = require('express');
const router = express.Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothingItems');

const auth = require('../middlewares/auth'); // 🔐 Importă middleware-ul de autentificare

router.use(auth); // 🔐 Toate rutele de mai jos sunt protejate cu JWT

router.get('/', getItems);
router.post('/', createItem);
router.delete('/:itemId', deleteItem);
router.put('/:itemId/likes', likeItem);
router.delete('/:itemId/likes', unlikeItem);

module.exports = router;