import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import config from '../../config/secret';

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
function isUser(req: AuthRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (id !== req.user?._id) {
        return res.status(401).json({ success: false, message: 'Error user access' });
    }
    next();
}
const isAuthorized = function (req: AuthRequest, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];

        req.token = token;

        return verifyToken(req, res, next);
    } else {
        throw createError(401, { success: false, message: 'Authorization needed' });
    }
};
export { isUser, isAuthorized };
