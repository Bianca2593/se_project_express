const express = require('express');

const router = express.Router();

const { getCurrentUser, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUpdateProfile } = require('../middlewares/validators'); // 👈

router.use(auth); // 🔐 toate rutele protejate

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateProfile, updateUser); // 👈 validare înainte de controller

module.exports = router;