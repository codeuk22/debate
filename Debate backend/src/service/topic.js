import { topicModel } from "../models/topic.js";

export const createTopic = async (payload) => new Promise((resolve, reject) => {

    topicModel.create(payload)
        .then(resolve)
        .catch(reject)
});

export const updateTopic = async (search, payload, options = { new: true }) => new Promise((resolve, reject) => {

    topicModel.findOneAndUpdate(search, payload, options)
        .lean()
        .then(resolve)
        .catch(reject)
});

export const getTopic = async (search) => new Promise(async (resolve, reject) => {

    topicModel.findOne(search)
        .populate('_user', 'name email')
        .populate('_comment')
        .lean()
        .then(resolve)
        .catch(reject)
});

export const getTopics = async (search) => new Promise(async (resolve, reject) => {

    topicModel.find(search)
        .populate('_user', 'name email')
        .populate('_comment')
        .lean()
        .then(resolve)
        .catch(reject)
});

export const deleteTopic = async (search) => new Promise((resolve, reject) => {

    topicModel.findOneAndUpdate(search, { status: 'DELETED' })
        .then(resolve)
        .catch(reject)
});