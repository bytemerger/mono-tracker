import config from '../config/secret';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const { statusCode, message } = err;

    const response = {
        code: statusCode,
        message,
        ...(config.ENV === 'development' && { stack: err.stack }),
    };

    if (config.ENV === 'development') {
        // logger.error(err);
    }

    return res.status(statusCode).json(response);
};
