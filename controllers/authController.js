const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentModel = require('../models/student');
const TeacherModel = require('../models/teacher');
const connectDatabases = require('../config/db');

let studentDB, teacherDB, Student, Teacher;

(async () => {
  const dbs = await connectDatabases();
  studentDB = dbs.studentDB;
  teacherDB = dbs.teacherDB;
  Student = StudentModel(studentDB);
  Teacher = TeacherModel(teacherDB);
})();

exports.register = async (req, res) => {
  const { role, ...data } = req.body;

  const validRoles = ['student', 'teacher'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  if (!data.email || !data.password || !data.name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    // Handle uploaded files
    if (req.files?.profilePicture) {
      data.profilePicture = req.files.profilePicture[0].path; // e.g. uploads/teacher/pick/...
    }

    if (req.files?.qualification) {
      data.qualification = req.files.qualification[0].path; // e.g. uploads/teacher/docs/...
    }

    // Hash the password
    data.password = await bcrypt.hash(data.password, 10);

    let newUser;
    if (role === 'student') {
      newUser = await new Student(data).save();
    } else {
      newUser = await new Teacher(data).save();
    }

    const { password, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  const { role, email, password } = req.body;

  const validRoles = ['student', 'teacher'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    let user;
    if (role === 'student') {
      user = await Student.findOne({ email });
    } else {
      user = await Teacher.findOne({ email });
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: pwd, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: 'Login successful', token, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
};
