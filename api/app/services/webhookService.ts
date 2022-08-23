import { Types } from 'mongoose';
import * as Mono from '../services/mono';
import Account, { IAccount } from '../models/Accounts';
import Transaction, { ITransaction } from '../models/Transaction';

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
            await updateAccount(data.account['_id'], data.account);
        }

        // get the transactions if account hasNewData

        const accountIdObject = new Types.ObjectId(data.account['_id']);
        const account = await Account.findById(accountIdObject);
        if (account?.getTransc) {
            const transactions = (await Mono.getTransactions(data.account['_id'])) as any;
            for (const transc of transactions['data']) {
                await Transaction.update(
                    { _id: new Types.ObjectId(transc._id) },
                    { ...transc, accountId: account._id, ownerId: account.owner },
                    { upsert: true },
                );
            }
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
