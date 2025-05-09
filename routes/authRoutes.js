const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middlewares/upload');

router.post(
    '/register',
    upload.fields([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'qualification', maxCount: 1 },
    ]),
    authController.register
  );
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
