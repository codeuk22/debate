import Joi from "joi";
import { makeResponse } from "../lib/response/index.js";


export const validateCreateCommentPayload = async (req, res, next) => {

    const { error } = Joi.object({
        topicId: Joi.string().required(),
        comment: Joi.string().required(),
        commentUrl: Joi.string().optional()
    })
        .required()
        .validate(req.body);

    if (error) {
        console.log(error)
        return makeResponse(res, 400, false, error.details[0].message.split('\"').join(""))
    }
    next();
};