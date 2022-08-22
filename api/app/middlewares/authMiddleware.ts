import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../../config/secret';
import { getUserById } from '../services/userService';

interface AuthRequest extends Request {
    user?: jwt.JwtPayload;
    token?: string;
}

const verifyToken = function (req: AuthRequest, res: Response, next: NextFunction) {
    jwt.verify(req.token || '', config.JWT_SECRET || '', (err, authData) => {
        if (err) {
            return res.status(401).json({ success: false, ...err });
        } else {
            if (authData) {
                req.user = authData; // set user data to local response
            }
            next();
        }
    });
};
async function isUser(req: AuthRequest, res: Response, next: NextFunction) {
    const { id } = req.params;

    // check if user still exist if token is still active deleted accounts can make request
    const result = await getUserById(Types.ObjectId(id));

    if (!result || id !== req.user?._id) {
        return res.status(401).json({ success: false, message: 'Error user access' });
    }
    next();
}
const isAuthenticated = function (req: AuthRequest, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];

        req.token = token;

        return verifyToken(req, res, next);
    } else {
        throw createError(401, { success: false, message: 'Authentication needed' });
    }
};
export { isUser, isAuthenticated };
