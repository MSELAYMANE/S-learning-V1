const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePicture: String,
  domains: [String],
  portfolio: { type: String, required: false },
  agree: Boolean,
  motivation: String,
  qualification: String,
  specialty: String,
  job: String,
});

teacherSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = (conn) => conn.model('Teacher', teacherSchema);
