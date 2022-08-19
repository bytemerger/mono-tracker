import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    password: string;
    accounts: Array<string>;
}

const Users = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        accounts: [{
            type: Schema.Types.ObjectId,
            ref: 'Account',
        }],
    },
    { timestamps: true },
);
Users.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};
Users.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt
        .hash(this.get('password'), 10)
        .then((hash) => {
            this.set('password', hash);
            next();
        })
        .catch((error) => {
            console.log(`Error in hashing password: ${error.message}`);
            next(error);
        });
});
const model = mongoose.model<IUser>('user', Users);
export default model;
