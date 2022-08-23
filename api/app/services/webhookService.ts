import { Types } from 'mongoose';
import * as Mono from '../services/mono';
import Account, { IAccount } from '../models/Accounts';
import { getUserAccTransactions } from './userService';

type Event =
    | 'mono.events.account_updated'
    | 'mono.events.account_connected'
    | 'mono.events.reauthorisation_required'
    | 'mono.events.account_reauthorized';

async function updateAccount(id: string, data: IAccount) {
    const accId = new Types.ObjectId(data['_id']);
    delete data._id;
    const check = await Account.find({ accountNumber: data.accountNumber });
    if (check.length >= 1) {
        await Account.update({ accountNumber: data.accountNumber }, { ...data, getTransc: true });
        return true;
    }
    await Account.update({ _id: accId }, { ...data, getTransc: true }, { upsert: true });
}
export async function processWebhookData({ event, data }: { event: Event; data: any }) {
    if (event === 'mono.events.account_updated') {
        if (data.meta.data_status === 'AVAILABLE') {
            const copy = JSON.parse(JSON.stringify(data.account));
            await updateAccount(data.account['_id'], copy);
        }

        // get the transactions if account hasNewData

        const accountIdObject = new Types.ObjectId(data.account['_id']);
        const account = await Account.findById(accountIdObject);

        // This means it is a new account we will already get the transactions
        if (!account?.owner) {
            return true;
        }
        if (account?.getTransc) {
            await getUserAccTransactions(account.owner, data.account['_id']);
            await Account.update({ _id: accountIdObject }, { getTransc: false });
        }
        return true;
    }
    if (event === 'mono.events.account_connected') {
        const accountInfo = (await Mono.getAccount(data['id'])) as any;
        if (accountInfo.meta.data_status === 'AVAILABLE') {
            await updateAccount(accountInfo.account['_id'], accountInfo.account);
            return true;
        }
    }

    if (event === 'mono.events.reauthorisation_required') {
        await Account.update({ _id: new Types.ObjectId(data.account['_id']) }, { reAuth: true });
        return true;
    }
    if (event === 'mono.events.account_reauthorized') {
        await Account.update({ _id: new Types.ObjectId(data.account['_id']) }, { reAuth: false });
        return true;
    }
}
