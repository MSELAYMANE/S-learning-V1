const mongoose = require('mongoose');

const connectDatabases = () => {
  const studentDB = mongoose.createConnection(process.env.MONGO_URI_STUDENTS);
  const teacherDB = mongoose.createConnection(process.env.MONGO_URI_TEACHERS);

  studentDB.on('connected', () => {
    console.log('✅ Connected to StudentDB');
  });

  teacherDB.on('connected', () => {
    console.log('✅ Connected to TeacherDB');
  });

  studentDB.on('error', (err) => {
    console.error('❌ StudentDB connection error:', err);
  });

  teacherDB.on('error', (err) => {
    console.error('❌ TeacherDB connection error:', err);
  });

  return { studentDB, teacherDB };
};

module.exports = connectDatabases;
