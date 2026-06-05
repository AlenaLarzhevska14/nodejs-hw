import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'No file');
    }

    const { buffer } = req.file;
    const uploadResult = await saveFileToCloudinary(
      buffer,
      req.user._id || req.user.id,
    );
    const avatarUrl = uploadResult.secure_url;

    await User.findByIdAndUpdate(
      req.user._id || req.user.id,
      { avatar: avatarUrl },
      { new: true },
    );

    return res.status(200).json({ url: avatarUrl });
  } catch (err) {
    next(err);
  }
};
