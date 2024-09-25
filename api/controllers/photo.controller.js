import Photo from '../models/photo.model.js';
// import { errorHandler } from '../utils/error.js';

export const uploadPhoto = async (req, res, next) => {
  const userId = req.user.id;
  const url = `/uploads/${req.file.filename}`;

  try {
    const newPhoto = new Photo({ url, userId });
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    next(error);
  }
};

export const getUserPhotos = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const photos = await Photo.find({ userId });
    res.status(200).json(photos);
  } catch (error) {
    next(error);
  }
};
