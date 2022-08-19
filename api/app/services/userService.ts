import { DocumentDefinition, FilterQuery, LeanDocument, Types } from 'mongoose';
import Users, { IUser } from '../models/Users';
import createError, { UnknownError } from 'http-errors';
import * as Mono from './mono';
import MonoError from './mono/MonoError';

async function getUserById(id: Types.ObjectId): Promise<LeanDocument<IUser> | null> {
    try {
        return (await Users.findById(id))?.toJSON() ?? null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function getUser(query: FilterQuery<IUser>): Promise<LeanDocument<IUser> | null> {
    try {
        return (await Users.findOne({ query }))?.toJSON() ?? null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function createNewUser(UserInput: DocumentDefinition<IUser>): Promise<LeanDocument<IUser> | false> {
    try {
        const User = (await Users.create(UserInput)).toJSON();
        return User;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function getUserAccounts(id: Types.ObjectId): Promise<LeanDocument<Pick<IUser, 'accounts'>> | null> {
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
): Promise<LeanDocument<IUser> | null> {
    try {
        return (
            (
                await Users.findOneAndUpdate(
                    { _id: id },
                    { [action === 'ADD' ? '$addToSet' : '$pull']: { accounts: UserInput.accountId } },
                    { new: true },
                ).exec()
            )?.toJSON() || null
        );
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function removeAccount(id: Types.ObjectId, UserInput: { accountId: string }): Promise<boolean> {
    try {
        const accts = (await Users.findById(id))?.toJSON();

        //accountId does not exist
        if (!accts?.accounts.includes(UserInput.accountId)) {
            throw createError(404, { message: 'account does not exist' });
        }

        // unlink from mono
        const unlink = await Mono.unlinkAccount(UserInput.accountId);

        if (unlink) {
            updateUserAccounts(id, UserInput, 'REMOVE');
        }

        return true;
    } catch (error) {
        if (error instanceof MonoError) {
            throw createError(error.code, { message: error.message });
        }
        throw createError('500', error as UnknownError);
    }
}
export { getUser, createNewUser, updateUserAccounts, getUserById, getUserAccounts, removeAccount };
