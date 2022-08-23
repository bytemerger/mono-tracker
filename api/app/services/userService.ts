import { DocumentDefinition, FilterQuery, LeanDocument, Types } from 'mongoose';
import Users, { IUser } from '../models/Users';
import Account, { IAccount } from '../models/Accounts';
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

async function getUserAccounts(id: Types.ObjectId): Promise<{ accounts: IAccount[] } | null> {
    try {
        const accts = await Account.find({ owner: id });
        if (accts) return { accounts: accts };
        return null;
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function updateUserAccounts(id: Types.ObjectId, accountId: string, action: 'ADD' | 'REMOVE'): Promise<boolean> {
    try {
        const accId = new Types.ObjectId(accountId);
        if (action === 'ADD') {
            // will be hydrated by the hook event
            await Account.update({ _id: accId }, { owner: id, getTransc:true }, { upsert: true });
            return true;
        }
        await Account.findByIdAndDelete(accId);
        return true;
        // no  need for tracking on user model
        /* return (
            (
                await Users.findByIdAndUpdate(
                    id,
                    { [action === 'ADD' ? '$addToSet' : '$pull']: { accounts: accId } },
                    { new: true },
                ).exec()
            )?.toJSON() || null
        ); */
    } catch (error) {
        throw createError('500', error as UnknownError);
    }
}

async function unlinkMonoAcc(userId: Types.ObjectId, accId: string) {
    // unlink from mono
    const unlink = await Mono.unlinkAccount(accId);

    if (unlink) {
        updateUserAccounts(userId, accId, 'REMOVE');
    }
}

async function removeAccount(id: Types.ObjectId, UserInput: { accountId: string }): Promise<boolean> {
    try {
        const accts = await Account.find({ _id: new Types.ObjectId(UserInput.accountId), owner: id });

        //accountId does not exist
        if (accts.length < 1) {
            throw createError(404, { message: 'account does not exist' });
        }

        await unlinkMonoAcc(id, UserInput.accountId);

        return true;
    } catch (error) {
        if (error instanceof MonoError) {
            throw createError(error.code, { message: error.message });
        }
        throw createError('500', error as UnknownError);
    }
}
async function deleteUser(id: string): Promise<boolean> {
    const ID = new Types.ObjectId(id);
    // delete all the accounts linked to the user
    const userMonoAccounts = await Account.find({ owner: id });

    if (Array.isArray(userMonoAccounts) && userMonoAccounts.length > 0) {
        for (const acc of userMonoAccounts) {
            await unlinkMonoAcc(ID, acc._id);
        }
    }

    await Users.findByIdAndDelete(ID);

    return true;
}

async function requireReAuth(id: string) {
    await Account.update({ _id: Types.ObjectId(id) }, { reAuth: true });
}
async function refreshTransactions() {
    const accounts = await Account.find();

    for (let i = 0; i < accounts.length; i++) {
        const accountId = accounts[i]._id.toString();

        // use proper logger
        console.log(`refreshing account: ${accountId}`);

        const res = (await Mono.refreshTrans(accountId)) as any;
        if (res.hasNewData) {
            await Account.update({ _id: Types.ObjectId(accountId) }, { getTransc: true });
        }
        if (res.code === 'REAUTHORISATION_REQUIRED') {
            await requireReAuth(accountId);
        }
    }
}

export {
    getUser,
    createNewUser,
    updateUserAccounts,
    getUserById,
    getUserAccounts,
    removeAccount,
    deleteUser,
    refreshTransactions,
};
