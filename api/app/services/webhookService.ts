import { Types } from 'mongoose';
import * as Mono from '../services/mono';
import Account, { IAccount } from '../models/Accounts';

type Event = 'mono.events.account_updated' | 'mono.events.account_connected';

async function updateAccount(id: string, data: IAccount) {
    const accId = new Types.ObjectId(data['_id']);
    const check = await Account.find({ accountNumber: data.accountNumber });
    if (check.length >= 1) {
        return true;
    }
    await Account.update({ _id: accId }, { ...data, getTransc: true }, { upsert: true });
}
export async function processWebhookData({ event, data }: { event: Event; data: any }) {
    if (event === 'mono.events.account_updated') {
        if (data.meta.data_status === 'AVAILABLE') {
            await updateAccount(data.account['_id'], data.account);
            return true;
        }
    }
    if (event === 'mono.events.account_connected') {
        const accountInfo = (await Mono.getAccount(data['id'])) as any;
        if (accountInfo.meta.data_status === 'AVAILABLE') {
            await updateAccount(accountInfo.account['_id'], accountInfo.account);
            return true;
        }
    }
}
