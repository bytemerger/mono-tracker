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
    getTransc: boolean;
    reAuth: boolean;
    owner: IUser['_id'];
}

const accounts = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, required: true },
        institution: {
            name: { type: String },
            bankCode: { type: String },
            type: { type: String },
        },
        name: String,
        accountNumber: String,
        getTransc: Boolean,
        reAuth: Boolean,
        type: String,
        balance: String,
        currency: String,
        owner: Schema.Types.ObjectId,
    },
    { timestamps: true, _id: false },
);

const model = mongoose.model<IAccount>('account', accounts);
export default model;
