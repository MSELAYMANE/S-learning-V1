const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');

// Like/Unlike Post
router.post('/:postId/like', auth, postController.toggleLike);

// Bookmark/Unbookmark Post
router.post('/:postId/bookmark', auth, postController.toggleBookmark);

module.exports = router;