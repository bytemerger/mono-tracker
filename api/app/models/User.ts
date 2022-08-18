import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAuthors extends Document {
    name: string;
    bio: string;
    email: string;
    password: string;
    facebookBio?: string;
    twitterBio?: string;
    posts: Array<Types.ObjectId | Record<string, unknown>>;
}

const Authors = new Schema(
    {
        name: { type: String, required: true },
        bio: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        facebookBio: String,
        twitterBio: String,
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'post',
            },
        ],
    },
    { timestamps: true },
);
Authors.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
Authors.pre('save', function (next) {
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
const model = mongoose.model<IAuthors>('authors', Authors);
export default model;
