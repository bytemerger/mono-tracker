import { NextFunction, Request, Response } from 'express';
import paginate from '../helpers/paginate';
import Transaction, { ITransaction } from '../models/Transaction';
import createError, { UnknownError } from 'http-errors';

export async function getAccountTransactions(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || id.length < 1) {
        return res.status(400).json({ message: 'Bad Request -invalid ID' });
    }
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 1000;
    try {
        // get the total matching elments
        const totalDocuments = await Transaction.find({ accountId: id }).estimatedDocumentCount();

        const transactionModel = Transaction.find({ accountId: id });
        const transactionCollections = await paginate<ITransaction>(transactionModel, totalDocuments, page, perPage);
        return res.status(200).json({ ...transactionCollections });
    } catch (error) {
        return next(createError(500, { message: error }));
    }
}
