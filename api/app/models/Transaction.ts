import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUsers } from './User';

export interface Ipost extends Document {
    title: string;
    summary: string;
    tags?: string[];
    body: string;
    image?: string;
    author: Types.ObjectId | Record<string, unknown>;
}
export interface IpostDocument extends Ipost {
    author: IAuthors['_id'];
}
const posts = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        tags: [
            {
                type: String,
            },
        ],
        body: { type: String, required: true },
        image: String,
        author: Schema.Types.ObjectId,
    },
    { timestamps: true },
);

const model = mongoose.model<IpostDocument>('post', posts);
export default model;
