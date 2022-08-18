import * as authorService from '../services/authorsServices';
import Validator from 'validatorjs';
import { NextFunction, Request, Response } from 'express';
import { IAuthors } from '../models/Authors';
import mongoose from 'mongoose';
import createError from 'http-errors';

export async function getAuthorById(req: Request, res: Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    const getAuthor = await authorService.getAuthorById(objectId);
    return res.status(200).json({ data: getAuthor });
}
export async function getAuthors(req: Request, res: Response) {
    const getAuthor = await authorService.getAuthors();
    return res.status(200).json({ data: getAuthor });
}
export async function createAuthor(req: Request, res: Response, next: NextFunction) {
    const validator = new Validator(req.body, {
        name: 'required|string',
        bio: 'required|string',
        email: 'required|email',
        password: 'required|string',
        facebookBio: 'string',
        twitterBio: 'string',
    });

    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    try {
        const author = await authorService.createNewAuthor(req.body);
        res.status(200).json({ data: author });
    } catch (err) {
        return next(createError(500, { message: err + '... Could not create a new Author' }));
    }
}

export async function updateAuthor(req: Request, res: Response, next: NextFunction) {
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
    const author: IAuthors = req.body;
    try {
        const updatedAuthor = await authorService.updateAuthor(id, req.body);
        return res.status(200).json({ data: updatedAuthor });
    } catch (err) {
        return next(createError(500, { message: err + '... Could not update Author with id ' + id }));
    }
}
/* export async function deleteAuthor(req: Request, res: Response) {
    const { id } = req.params;
    const getAuthor = await Authors.findByIdAndDelete(id);
    return res.status(200).json({ message: 'successfully deleted author with ID ' + id });
} */
