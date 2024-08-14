import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { userController } from '../controllers/user.js';
import { topicController } from '../controllers/topic.js';
import { commentController } from '../controllers/comment.js';
import { replyController } from '../controllers/reply..js';

export const router = Router();

router.use('/user', upload.fields([{ name: 'profile', maxCount: 1 }]), userController);
router.use('/topic', topicController);
router.use('/comment',  commentController);
router.use('/reply',  replyController);
