const StudentModel = require('../models/student');
const connectDatabases = require('../config/db');

let Student;

// Initialize database connection and model
(async () => {
  const dbs = await connectDatabases();
  Student = StudentModel(dbs.studentDB);
})();

const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .select('-password -__v -tokens')
      .populate({
        path: 'courses.courseId',
        select: 'name progress teacher hours'
      });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const learningStats = {
      totalCourses: student.courses.length,
      completedCourses: student.courses.filter(c => c.progress === 100).length,
      totalHours: student.courses.reduce((sum, course) => sum + (course.courseId?.hours || 0), 0),
      overallProgress: student.courses.reduce((sum, course) => sum + course.progress, 0) / 
                      (student.courses.length || 1)
    };

    res.json({
      user: {
        name: student.name,
        email: student.email,
        profilePicture: student.profilePicture,
        learningGoal: student.learningGoal
      },
      courses: student.courses,
      stats: learningStats
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'learningGoal', 'preferredLanguage'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    if (req.file) {
      req.body.profilePicture = req.file.path;
    }

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password -__v -tokens');

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ error: 'Update failed' });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { courses: { courseId, progress: 0 } } },
      { new: true }
    ).select('courses');

    res.json(student.courses);
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(400).json({ error: 'Enrollment failed' });
  }
};

// Export controller methods
module.exports = {
  getStudentDashboard,
  updateProfile,
  enrollCourse
};