const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

let gfsBucket;

// Initialize GridFS bucket
mongoose.connection.once('open', () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'sponsorshipScreenshots'
  });
});

// GridFS storage engine
const gridfsStorage = multer.memoryStorage();

const gridfsUpload = multer({
  storage: gridfsStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Helper function to upload file to GridFS
const uploadToGridFS = (file, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = gfsBucket.openUploadStream(filename, {
      metadata: {
        originalName: file.originalname,
        mimetype: file.mimetype,
        uploadDate: new Date()
      }
    });

    uploadStream.on('error', reject);
    uploadStream.on('finish', () => {
      resolve(uploadStream.id.toString());
    });

    uploadStream.end(file.buffer);
  });
};

// Helper function to get file from GridFS
const getFromGridFS = (fileId) => {
  return gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
};

module.exports = {
  gridfsUpload,
  uploadToGridFS,
  getFromGridFS,
  gfsBucket: () => gfsBucket
};