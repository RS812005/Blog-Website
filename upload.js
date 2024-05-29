const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Ensure 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    const tempFilename = 'temp-' + Date.now() + path.extname(file.originalname); // Temporary filename
    cb(null, tempFilename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;