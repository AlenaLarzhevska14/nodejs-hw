import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { updateUserAvatar } from '../controllers/userController';
import { upload } from '../middleware/multer.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
