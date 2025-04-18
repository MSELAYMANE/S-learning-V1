const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const studentController = require('../controllers/studentcontroller');
const upload = require('../middlewares/upload'); // Make sure you have this

// Student Dashboard Data
router.get('/dashboard', auth, studentController.getStudentDashboard);

// Update Student Profile
router.patch('/profile', auth, upload.single('profilePicture'), studentController.updateProfile);

// Course Enrollment
router.post('/courses/enroll', auth, studentController.enrollCourse);

module.exports = router;