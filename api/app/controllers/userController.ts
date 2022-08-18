import * as UserService from '../services/userService';
import Validator from 'validatorjs';
import { NextFunction, Request, Response } from 'express';
import { IUsers } from '../models/User';
import mongoose from 'mongoose';
import createError from 'http-errors';

export async function getUserById(req: Request, res: Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    const getUser = await UserService.getUserById(objectId);
    return res.status(200).json({ data: getUser });
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    const validator = new Validator(req.body, {
        email: 'required|email',
        password: 'required|string',
    });

    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    try {
        const User = await UserService.createNewUser(req.body);
        res.status(200).json({ data: User });
    } catch (err) {
        return next(createError(500, { message: err + '... Could not create a new User' }));
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const validator = new Validator(req.body, {
        name: 'alpha_num',
        bio: 'string',
        facebookBio: 'string',
        twitterBio: 'string',
    });

    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    const User: IUsers = req.body;
    try {
        const updatedUser = await UserService.updateUser(id, req.body);
        return res.status(200).json({ data: updatedUser });
    } catch (err) {
        return next(createError(500, { message: err + '... Could not update User with id ' + id }));
    }
}
/* export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const getUser = await Users.findByIdAndDelete(id);
    return res.status(200).json({ message: 'successfully deleted User with ID ' + id });
} */
