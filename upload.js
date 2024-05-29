const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Ensure 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = req.user.name + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use original file extension
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
