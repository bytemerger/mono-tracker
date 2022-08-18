import { DocumentDefinition, FilterQuery, LeanDocument, Types } from 'mongoose';
import Users, { IUsers } from '../models/User';
import createError, { UnknownError } from 'http-errors';

async function getUserById(id: Types.ObjectId): Promise<LeanDocument<IUsers> | null> {
    try {
        return (await Users.findById(id))?.toJSON() ?? null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function getUser(query: FilterQuery<IUsers>): Promise<LeanDocument<IUsers> | null> {
    try {
        return (await Users.findOne({ query }))?.toJSON() ?? null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
async function createNewUser(UserInput: DocumentDefinition<IUsers>): Promise<LeanDocument<IUsers> | false> {
    try {
        const User = (await Users.create(UserInput)).toJSON();
        return User;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
async function updateUser(
    id: Types.ObjectId,
    UserInput: DocumentDefinition<IUsers>,
): Promise<LeanDocument<IUsers> | null> {
    try {
        return (
            (await Users.findOneAndUpdate({ _id: id }, { ...UserInput }, { new: true }).exec())?.toJSON() || null
        );
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
export { getUser, createNewUser, updateUser, getUserById, };
