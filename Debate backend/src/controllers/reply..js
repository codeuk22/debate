import { Router } from 'express';
import { makeResponse } from '../lib/response/index.js';
import { createReply, deleteReply, getReplies, operateLikeOnReply, updateReply } from '../service/reply.js';
import { updateComment } from '../service/comment.js';
import { verifyUser } from '../middlewares/jwt.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router()

router.post('/create', verifyUser, async (req, res) => {


    try {

        const { commentId, reply } = req.body;

        const replyLocalPath = req.files?.profile[0]?.path;

        const upload = await uploadOnCloudinary(replyLocalPath);

        const replyCreate = await createReply({ _user: req.user._id, _comment: commentId, reply: reply, replyUrl: upload?.url || '' });

        await updateComment({ _id: commentId }, { $push: { _reply: replyCreate._id } });

        await makeResponse(res, 200, true, 'Reply Created Successfully', replyCreate);

    } catch (error) {
        console.log(error)
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

router.put('/update/reply-url', verifyUser, upload.fields([{ name: 'replyUrl', maxCount: 1 }]), async (req, res) => {

    try {
        const replyLocalPath = req.files?.replyUrl[0]?.path;
        const upload = await uploadOnCloudinary(replyLocalPath);
        const replyUpdate = await updateReply({ _id: req.body.replyId }, { $set: { replyUrl: upload?.url || '' } });
        await makeResponse(res, 200, true, 'Reply Image Updated Successfully', replyUpdate);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Updating Reply Image', error);
    }
});

export const replyController = router;
