const express = require('express');
const router = express.Router();
const multer = require('multer');
const s3 = require('../config/awss3');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/File'); // ← Add this

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { protect } = require('../middlewares/authMiddleware');

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const uploader = req.user.email; // Get email from token

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();

    // 🧠 Save metadata to MongoDB
    const savedFile = await File.create({
      filename: file.originalname,
      url: data.Location,
      uploader: 'vamsi@example.com', // Placeholder — replace with actual user later
    });

    router.get('/my-files', protect, async (req, res) => {
        const uploader = req.user.email;
      
        const files = await File.find({ uploader }).sort({ createdAt: -1 });
        res.json({ files });
    res.status(200).json({
      message: 'File uploaded and saved',
      file: savedFile,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
});
