const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dynamically set storage destination based on field name and role
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { role } = req.body;

    let folder = 'uploads/';
    if (role === 'teacher') {
      if (file.fieldname === 'profilePicture') {
        folder += 'teacher/pick/';
      } else if (file.fieldname === 'qualification') {
        folder += 'teacher/docs/';
      }
    } else if (role === 'student') {
      if (file.fieldname === 'profilePicture') {
        folder += 'student/pick/';
      }
    }

    // Ensure the folder exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Optional: Filter file types
const fileFilter = (req, file, cb) => {
  const imageTypes = ['image/jpeg', 'image/png'];
  const docTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  if (file.fieldname === 'profilePicture') {
    if (imageTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error('Only images are allowed for profile picture'), false);
  }

  if (file.fieldname === 'qualification') {
    if (docTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error('Only document files are allowed for qualification'), false);
  }

  cb(new Error('Invalid file field'), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
