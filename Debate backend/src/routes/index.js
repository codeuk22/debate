import { Router } from 'express';
import { userController } from '../controllers/user.js';
import { topicController } from '../controllers/topic.js';
import { commentController } from '../controllers/comment.js';
import { replyController } from '../controllers/reply..js';

export const router = Router();

router.use('/user', userController);
router.use('/topic', topicController);
router.use('/comment', commentController);
router.use('/reply', replyController);
