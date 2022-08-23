import * as UserService from '../services/userService';
import * as Mono from '../services/mono';
import Validator from '../helpers/validator';
import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import createError, { UnknownError } from 'http-errors';
import MonoError from '../services/mono/MonoError';
import Transaction, { ITransaction } from '../models/Transaction';
import paginate from '../helpers/paginate';

export async function getUserById(req: Request, res: Response) {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    const getUser = await UserService.getUserById(objectId);
    return res.status(200).json({ data: getUser });
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
    const validator = new Validator(req.body, {
        email: 'required|email',
        password: 'required|string',
        firstName: 'string',
        lastName: 'string',
    });

    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    try {
        const User = await UserService.createNewUser(req.body);
        if (!User) {
            return res.status(400).json({ success: false, message: 'user already exists' });
        }
        res.status(200).json({ data: User });
    } catch (err) {
        return next(createError(500, { message: err + '... Could not create a new User' }));
    }
}

export async function getUserAccounts(req: Request, res: Response, next: NextFunction) {
    //let id;
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const accounts = await UserService.getUserAccounts(id);
        if (accounts === null) {
            return next(createError(404, { message: 'User account does not exist' }));
        }
        // get user total balance
        const totalBalance = accounts.accounts.reduce((total, acc) => {
            return total + parseInt(acc.balance);
        }, 0);
        return res.status(200).json({ data: { ...accounts, totalBalance } });
    } catch (err) {
        console.log(err);
        return next(createError(500, { message: err + '... Could not get User with id ' }));
    }
}

export async function addUserAccount(req: Request, res: Response, next: NextFunction) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const validator = new Validator(req.body, {
        token: 'required|string',
    });

    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    try {
        const result = await Mono.authAccount(req.body['token']);
        const updatedUser = await UserService.updateUserAccounts(id, result.id, 'ADD');
        return res.status(200).json({ data: { success: true, message: 'successfully linked' } });
    } catch (err) {
        if (err instanceof MonoError) {
            return next(createError(err.code, { message: err.message + '... mono service' }));
        }
        return next(createError(500, { message: err + '... Could not update User with id ' + id }));
    }
}

export async function removeUserAccount(req: Request, res: Response, next: NextFunction) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const validator = new Validator(req.body, {
        accountId: 'required|string',
    });

    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    try {
        const result = await UserService.removeAccount(id, req.body);
    } catch (error) {
        if (error instanceof createError) {
            return next(error);
        }
        return next(createError(500, error as UnknownError));
    }
    return res.status(200).json({ message: 'successfully deleted User with ID ' + id });
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
        const del = await UserService.deleteUser(id);
        return res.status(200).json({ message: 'successfully deleted User with ID ' + id });
    } catch (error) {
        return next(createError(500, { message: error }));
    }
}

export async function reAuth(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const validator = new Validator(req.body, {
        accountId: 'required|string',
    });

    if (validator.fails()) {
        const error = createError(400, { message: validator.errors.all() });
        return next(error);
    }
    try {
        const result = await Mono.reAuthAccount(req.body.accountId);
        return res.status(200).json({ token: result.token });
    } catch (err) {
        if (err instanceof MonoError) {
            return next(createError(err.code, { message: err.message + '... mono service' }));
        }
        return next(createError(500, { message: err + '... Could not update User with id ' + id }));
    }
}

// no need for a transaction service
export async function getUserTransactions(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Bad Request -invalid ID' });
    }
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 1000;
    try {
        // get the total matching elments
        const totalDocuments = await Transaction.find({ ownerId: id }).estimatedDocumentCount();

        const transactionModel = Transaction.find({ ownerId: id });
        const transactionCollections = await paginate<ITransaction>(transactionModel, totalDocuments, page, perPage);
        return res.status(200).json({ ...transactionCollections });
    } catch (error) {
        return res.sendStatus(500);
    }
}
