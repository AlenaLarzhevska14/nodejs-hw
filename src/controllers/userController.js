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

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id || req.user.id,
      { avatar: avatarUrl },
      { returnDocument: 'after' },
    );

    if (!updatedUser) {
      throw createHttpError(404, 'User not found');
    }

    return res.status(200).json({ url: updatedUser.avatar });
  } catch (err) {
    next(err);
  }
};
