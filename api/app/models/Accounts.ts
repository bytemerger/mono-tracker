import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUser } from './Users';

export interface IAccount extends Document {
    institution: {
        name: string;
        bankCode: string;
        type: string;
    };
    name: string;
    accountNumber: string;
    type: string;
    balance: string;
    currency: string;
    owner: IUser['_id'];
}

const accounts = new Schema(
    {
        institution: {
            name: { type: String },
            bankCode: { type: String },
            type: { type: String },
        },
        name: { type: String, required: true },
        accountNumber: { type: String, required: true },
        type: String,
        balance: String,
        currency: String,
        owner: Schema.Types.ObjectId,
    },
    { timestamps: true },
);

const model = mongoose.model<IAccount>('account', accounts);
export default model;
