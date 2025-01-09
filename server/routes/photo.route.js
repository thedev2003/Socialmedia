import express from 'express';
import multer from 'multer';
import { uploadPhoto, getUserPhotos } from '../controllers/photo.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});

router.post('/upload', verifyToken, upload.single('photo'), uploadPhoto);
router.get('/', verifyToken, getUserPhotos);

export default router;
