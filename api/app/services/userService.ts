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

async function getUserAccounts(id: Types.ObjectId): Promise<LeanDocument<Pick<IUsers, 'accounts'>> | null> {
    try {
        const accts = (await Users.findById(id))?.toJSON();
        if (accts?.accounts) return { accounts: accts.accounts };
        return null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function updateUserAccounts(
    id: Types.ObjectId,
    UserInput: { accountId: string },
    action: 'ADD' | 'REMOVE',
): Promise<LeanDocument<IUsers> | null> {
    try {
        return (
            (
                await Users.findOneAndUpdate(
                    { _id: id },
                    { [action === 'ADD' ? '$push' : '$pull']: { accounts: UserInput.accountId } },
                    { new: true },
                ).exec()
            )?.toJSON() || null
        );
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}
export { getUser, createNewUser, updateUserAccounts, getUserById, getUserAccounts };
