import { Router } from 'express';
import { makeResponse } from '../lib/response/index.js';
import { createTopic, deleteTopic, getTopic, getTopics, updateTopic } from '../service/topic.js';
import { verifyUser } from '../middlewares/jwt.js';
import { upload } from '../middlewares/multer.middleware.js';


const router = Router()

//createtopic
router.post('/create', verifyUser, upload.fields([{ name: 'topicUrl', maxCount: 1 }]), async (req, res) => {

    try {

        const { topicName } = req.body;

        const topicExist = await getTopic({ topicName: topicName, status: 'ACTIVE' });

        if (topicExist) {
            return makeResponse(res, 400, false, 'Topic already exists with this name', topicExist);
        }

        const topicLocalPath = req.files?.profile[0]?.path;

        const upload = await uploadOnCloudinary(topicLocalPath);

        const topicCreate = await createTopic({ topicName: topicName, _user: req.user._id, topicUrl: upload?.url || '' });

        await makeResponse(res, 200, true, 'Topic Created Successfully', topicCreate);

    } catch (error) {
        console.log('error', error)
        await makeResponse(res, 400, false, 'Error While Creating Topic', error);
    }
})


//edit topic
router.put('/update', verifyUser, async (req, res) => {

    try {

        const { topicId, topicName } = req.body;

        const topicUpdate = await updateTopic({ _id: topicId, status: 'ACTIVE' }, { topicName: topicName });

        await makeResponse(res, 200, true, 'Topic Updated Successfully', topicUpdate);

    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Updating Topic', error);
    }
})



//delete topic
router.delete('/delete', verifyUser, async (req, res) => {

    try {

        const { topicId } = req.body;

        const topicDelete = await deleteTopic({ _id: topicId });

        await makeResponse(res, 200, true, 'Topic Deleted Successfully', topicDelete);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Deleting Topic', error);
    }
});

router.get('/', async (req, res) => {


    try {
        const fetchTopics = await getTopics({ status: 'ACTIVE' });

        await makeResponse(res, 200, true, 'Topics Fetched Successfully', fetchTopics);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Fetching Topics', error);
    }
});

router.get('/:commentId', async (req, res) => {
    try {
        const Topic = await getTopic({ _id: req.params.commentId });
        await makeResponse(res, 200, true, 'Topic Fetched Successfully', Topic);
    } catch (error) {
        await makeResponse(res, 400, false, 'Error While Fetching Topic', error);
    }

});

export const topicController = router;
