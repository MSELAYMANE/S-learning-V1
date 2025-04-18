exports.toggleLike = async (req, res) => {
    try {
      const Post = req.conn.models.Post;
      const post = await Post.findById(req.params.postId);
      
      if (!post) return res.status(404).json({ error: 'Post not found' });
      
      const likeIndex = post.likes.indexOf(req.user.id);
      if (likeIndex === -1) {
        post.likes.push(req.user.id);
      } else {
        post.likes.splice(likeIndex, 1);
      }
      
      await post.save();
      res.json({ likes: post.likes.length, isLiked: likeIndex === -1 });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.toggleBookmark = async (req, res) => {
    try {
      const Student = req.conn.models.Student;
      const student = await Student.findById(req.user.id);
      
      const bookmarkIndex = student.bookmarks.indexOf(req.params.postId);
      if (bookmarkIndex === -1) {
        student.bookmarks.push(req.params.postId);
      } else {
        student.bookmarks.splice(bookmarkIndex, 1);
      }
      
      await student.save();
      res.json({ isBookmarked: bookmarkIndex === -1 });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };