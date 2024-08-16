import { makeResponse } from '../lib/response/index.js';
import { getUser } from '../service/user.js';
import jwt from 'jsonwebtoken';

export const generateAccessToken = async (userId) => {

    try {

        const accessToken = jwt.sign({ _id: userId }, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: String(process.env.ACCESS_JWT_EXPIRY) });
        return accessToken;

    } catch (error) {
        console.log('Error in generateAccessToken', error)
    }
}

export const verifyUser = async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return makeResponse(res, 401, false, 'Access Denied');
        }

        const verifyToken = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET));

        const user = await getUser({ _id: (verifyToken)?._id, status: 'ACTIVE' });

        if (!user) {
            return makeResponse(res, 404, false, 'User Not Found');
        }

        req.user = user;

        next();

    } catch (error) {
        await makeResponse(res, 400, false, error.message);
    }
}