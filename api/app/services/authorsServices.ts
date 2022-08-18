import { DocumentDefinition, FilterQuery, LeanDocument, Types } from 'mongoose';
import Authors, { IAuthors } from '../models/Authors';
import createError, { UnknownError } from 'http-errors';

async function getAuthorById(id: Types.ObjectId): Promise<LeanDocument<IAuthors> | null> {
    try {
        return (await Authors.findById(id))?.toJSON() ?? null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
async function getAuthors(): Promise<LeanDocument<IAuthors>[] | null> {
    try {
        return await Authors.find({}).exec();
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
async function getAuthor(query: FilterQuery<IAuthors>): Promise<LeanDocument<IAuthors> | null> {
    try {
        return (await Authors.findOne({ query }))?.toJSON() ?? null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
async function createNewAuthor(authorInput: DocumentDefinition<IAuthors>): Promise<LeanDocument<IAuthors> | false> {
    try {
        const author = (await Authors.create(authorInput)).toJSON();
        return author;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
async function updateAuthor(
    id: Types.ObjectId,
    authorInput: DocumentDefinition<IAuthors>,
): Promise<LeanDocument<IAuthors> | null> {
    try {
        return (
            (await Authors.findOneAndUpdate({ _id: id }, { ...authorInput }, { new: true }).exec())?.toJSON() || null
        );
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
export { getAuthor, createNewAuthor, updateAuthor, getAuthorById, getAuthors };
