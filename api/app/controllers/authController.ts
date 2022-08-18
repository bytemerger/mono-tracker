import Validator from 'validatorjs';
import { NextFunction, Request, Response } from 'express';
import createError, { UnknownError } from 'http-errors';
import * as Auth from '../services/authService';
import createHttpError from 'http-errors';

export async function login(req: Request, res: Response, next: NextFunction) {
    const validator = new Validator(req.body, {
        email: 'required|email',
        password: 'required|string',
    });
    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    try {
        const result = await Auth.Login(req.body.email, req.body.password);
        return res.status(200).json({ message: 'success', ...result });
    } catch (error) {
        if (error instanceof createHttpError) {
            return next(error);
        }
        return next(createError(error as UnknownError));
    }
}