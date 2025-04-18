// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const StudentModel = require('../models/student');
const TeacherModel = require('../models/teacher');
const connectDatabases = require('../config/db');

let Student, Teacher;

// Initialize databases and models (matches your controller setup)
(async () => {
  const dbs = await connectDatabases();
  Student = StudentModel(dbs.studentDB);
  Teacher = TeacherModel(dbs.teacherDB);
})();

const auth = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication token required' });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user based on role
    let user;
    if (decoded.role === 'student') {
      user = await Student.findOne({ 
        _id: decoded.id,
        email: decoded.email
      });
    } else if (decoded.role === 'teacher') {
      user = await Teacher.findOne({ 
        _id: decoded.id,
        email: decoded.email
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // 4. Attach user and token to request
    req.token = token;
    req.user = {
      id: user._id,
      role: decoded.role,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.status(500).json({ error: 'Authentication failed' });
  }
};

module.exports = auth;