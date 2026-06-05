import multer from 'multer';
import createHttpError from 'http-errors';

const storage = multer.memoryStorage();

const limits = {
  fileSize: 2 * 1024 * 1024, // 2MB
};

const fileFilter = (req, file, cb) => {
  if (!file || !file.mimetype || !file.mimetype.startsWith('image/')) {
    return cb(new createHttpError(400, 'Only images allowed'), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, limits, fileFilter });
