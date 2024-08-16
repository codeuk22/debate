import { Router } from 'express';
import { makeResponse } from '../lib/response/index.js';
import { createComment, deleteComment, getComments, operateLikeOnComment, updateComment } from '../service/comment.js';
import { validateCreateCommentPayload } from '../validation/comment.js';
import { updateTopic } from '../service/topic.js';
import { verifyUser } from '../middlewares/jwt.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router()

//To create a comment
router.post('/create', validateCreateCommentPayload, verifyUser, upload.fields([{ name: 'commentUrl', maxCount: 1 }]), async (req, res) => {

    try {

        const { topicId, comment } = req.body;

        const commentLocalPath = req.files?.profile[0]?.path;

        const upload = await uploadOnCloudinary(commentLocalPath);

        const commentCreate = await createComment({ _topic: topicId, comment: comment, _user: req.user._id, commentUrl: upload?.url || '' });

        await updateTopic({ _id: topicId }, { $push: { _comment: commentCreate._id } });

        await makeResponse(res, 200, true, 'Comment Created Successfully', commentCreate);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Creating Comment', error);
    }
})

//To delete a comment
router.delete('/delete', verifyUser, async (req, res) => {

    try {
        const { topicId, commentId } = req.body;

        const commentDelete = await deleteComment({ _id: commentId, _topic: topicId, _user: req.user._id });

        await makeResponse(res, 200, true, 'Comment Deleted Successfully', commentDelete);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Deleting Comment', error);
    }
})


//To edit a comment

router.put('/update', verifyUser, async (req, res) => {

    try {

        const { commentId, comment, topicId } = req.body;

        const commentUpdate = await updateComment({ _id: commentId, _topic: topicId, _user: req.user._id }, { comment: comment });

        await makeResponse(res, 200, true, 'Comment Edited Successfully', commentUpdate);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Editing Comment', error);
    }
});

router.get('/:commentId', async (req, res) => {

    try {

        const { commentId } = req.params;

        const fetchComments = await getComments({ _id: commentId });

        await makeResponse(res, 200, true, 'Comments Fetched Successfully', fetchComments);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Fetching Comments', error);
    }
});

router.put('/like', verifyUser, async (req, res) => {

    try {

        const { commentId, topicId, like } = req.body;

        let increaseLike;

        if (like) {
            increaseLike = await operateLikeOnComment({ _id: commentId, _topic: topicId }, { $push: { like: req.user._id } });
        } else {
            increaseLike = await operateLikeOnComment({ _id: commentId, _topic: topicId }, { $pull: { like: req.user._id } });
        }

        await makeResponse(res, 200, true, 'Comment Liked Successfully', increaseLike);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Fetching Comments', error);
    }
});

export const commentController = router;



