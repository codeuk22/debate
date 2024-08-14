import { Router } from 'express';
import { makeResponse } from '../lib/response/index.js';
import { createReply, deleteReply, getReplies, operateLikeOnReply, updateReply } from '../service/reply.js';
import { updateComment } from '../service/comment.js';
import { verifyUser } from '../middlewares/jwt.js';

const router = Router()

router.post('/create', verifyUser, async (req, res) => {


    try {

        const { commentId, reply } = req.body;

        const replyCreate = await createReply({ _user: req.user._id, _comment: commentId, reply: reply });

        await updateComment({ _id: commentId }, { $push: { _reply: replyCreate._id } });

        await makeResponse(res, 200, true, 'Reply Created Successfully', replyCreate);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Creating Reply', error);
    }
})

router.put('/update', verifyUser, async (req, res) => {

    try {
        const { commentId, reply, replyId } = req.body;

        const replyUpdate = await updateReply({ _comment: commentId, _user: req.user._id, _id: replyId }, { reply: reply });

        await makeResponse(res, 200, true, 'Reply Updated Successfully', replyUpdate);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Updating Reply', error);
    }
})

router.delete('/delete', verifyUser, async (req, res) => {

    try {

        const { commentId, replyId } = req.body;

        const replyDelete = await deleteReply({ _comment: commentId, _user: req.user._id, _id: replyId });

        await makeResponse(res, 200, true, 'Reply Deleted Successfully', replyDelete);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Deleting Reply', error);
    }
});

router.get('/:commentId', async (req, res) => {

    try {

        const { commentId } = req.params;

        const fetchReplies = await getReplies({ _comment: commentId });

        await makeResponse(res, 200, true, 'Comments Fetched Successfully', fetchReplies);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Fetching Replies', error);
    }
});

router.put('/like', verifyUser, async (req, res) => {

    try {

        const { commentId, replyId, like } = req.body;

        let increaseLike;

        if (like) {
            increaseLike = await operateLikeOnReply({ _id: replyId, _comment: commentId }, { $push: { like: req.user._id } });
        } else {
            increaseLike = await operateLikeOnReply({ _id: replyId, _comment: commentId }, { $pull: { like: req.user._id } });
        }

        await makeResponse(res, 200, true, 'Reply Liked Successfully', increaseLike);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While like Replies', error);
    }
});

export const replyController = router;
