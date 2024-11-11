import { commentModel } from "../models/comment.js";

export const createComment = async (payload) => new Promise((resolve, reject) => {

    commentModel.create(payload)
        .then(resolve)
        .catch(reject)
});

export const updateComment = async (search, payload, options = { new: true }) => new Promise((resolve, reject) => {

    commentModel.findOneAndUpdate(search, payload, options)
        .lean()
        .then(resolve)
        .catch(reject)
});

export const deleteComment = async (search) => new Promise((resolve, reject) => {

    commentModel.findOneAndDelete(search)
        .lean()
        .then(resolve)
        .catch(reject)
});

export const getComment = async (search) => new Promise(async (resolve, reject) => {

    commentModel.findOne(search)
        .populate('_user', '_comment')
        .populate('_reply')
        .lean()
        .sort({ createdAt: -1 })
        .then(resolve)
        .catch(reject)
});

export const getComments = async (search) => new Promise(async (resolve, reject) => {

    commentModel.find(search, { status: 'ACTIVE' })
        .populate('_user', '_comment')
        .populate('_reply')
        .lean()
        .sort({ createdAt: -1 })
        .then(resolve)
        .catch(reject)
});

export const operateLikeOnComment = async (search, update, options = { new: true }) => new Promise(async (resolve, reject) => {


    commentModel.findOneAndUpdate(search, update, options)
        .lean()
        .then(resolve)
        .catch(reject)
});