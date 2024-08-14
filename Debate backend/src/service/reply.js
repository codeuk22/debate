import { replyModel } from "../models/reply.js";

export const createReply = async (payload) => new Promise((resolve, reject) => {

    replyModel.create(payload)
        .then(resolve)
        .catch(reject)
});

export const updateReply = async (search, update, options = { new: true }) => new Promise(async (resolve, reject) => {

    replyModel.findOneAndUpdate(search, update, options)
        .then(resolve)
        .catch(reject);
});

export const deleteReply = async (search) => new Promise(async (resolve, reject) => {

    replyModel.findOneAndUpdate(search, { status: 'DELETED' })
        .then(resolve)
        .catch(reject)
});


export const getReplies = async (search) => new Promise(async (resolve, reject) => {

    replyModel.find(search, { status: 'ACTIVE' })
        .lean()
        .sort({ createdAt: -1 })
        .then(resolve)
        .catch(reject)
});

export const operateLikeOnReply = async (search, update, options = { new: true }) => new Promise(async (resolve, reject) => {


    replyModel.findOneAndUpdate(search, update, options)
        .lean()
        .then(resolve)
        .catch(reject)
});