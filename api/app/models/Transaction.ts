import mongoose, { Document, Schema, Types } from 'mongoose';
import { IAccount } from './Accounts';
import { IUser } from './Users';
export interface ITransaction extends Document {
    monoId: string;
    accountId: IAccount['_id'];
    ownerId: IUser['_id'];
    type: string;
    narration: string;
    amount: string;
    balance: string;
    date: string;
    category: string;
    currency: string;
}

const transactions = new Schema(
    {
        monoId: { type: String, required: true },
        accountId: { type: Schema.Types.ObjectId, required: true },
        ownerId: { type: Schema.Types.ObjectId, required: true },
        type: String,
        narration: String,
        amount: String,
        balance: String,
        date: String,
        category: String,
        currency: String,
    },
    { timestamps: true },
);

const model = mongoose.model<ITransaction>('transaction', transactions);
export default model;
