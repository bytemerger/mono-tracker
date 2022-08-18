import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../../config/secret';
import Authors, { IAuthors } from '../models/Authors';
import { createNewAuthor } from './authorsServices';
import { LeanDocument } from 'mongoose';

export async function Login(
    email: string,
    password: string,
): Promise<{
    user: LeanDocument<IAuthors>;
    token: string;
}> {
    const author = await Authors.findOne({ email }).select({ posts: 0, __v: 0, updatedAt: 0 });
    if (!author) {
        throw createError(400, { message: 'user does not exit' });
    }
    //check password
    const result = bcrypt.compareSync(password, author?.password ?? '');
    if (result) {
        const jwtToken = await jwt.sign(author.toJSON(), config.JWT_SECRET || '', {
            expiresIn: config.TOKEN_VALIDATION_PERIOD,
        });
        return { user: author.toJSON(), token: jwtToken };
    } else {
        throw createError(401, { message: 'Incorrect Username of password' });
    }
}
export async function socialLogin(user: any): Promise<Record<string, unknown>> {
    const author = await Authors.findOne({ email: user.email });
    if (!author) {
        createNewAuthor(user as IAuthors);
    }
    const token = await jwt.sign(user, config.JWT_SECRET || '', {
        expiresIn: config.TOKEN_VALIDATION_PERIOD,
    });
    return {
        message: `${user.email} successfully logged in.`,
        token,
    };
}
