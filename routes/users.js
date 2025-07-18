const express = require('express');
const router = express.Router();

const { getCurrentUser, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth'); // 🔐 Importă middleware-ul de autentificare

router.use(auth); // 🔐 Protejează toate rutele din acest router

router.get('/me', getCurrentUser);
router.patch('/me', updateUser);

module.exports = router;