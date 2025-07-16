const express = require('express');

const router = express.Router();

const { getCurrentUser, updateUser } = require('../controllers/users');

// 🔽 adăugăm o linie goală aici

router.get('/me', getCurrentUser);
router.patch('/me', updateUser);

module.exports = router;
