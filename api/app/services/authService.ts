import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../../config/secret';
import Users, { IUsers } from '../models/User';
import { createNewUser } from './userService';
import { LeanDocument } from 'mongoose';

export async function Login(
    email: string,
    password: string,
): Promise<{
    user: LeanDocument<IUsers>;
    token: string;
}> {
    const User = await Users.findOne({ email }).select({ posts: 0, __v: 0, updatedAt: 0 });
    if (!User) {
        throw createError(400, { message: 'user does not exit' });
    }
    //check password
    const result = bcrypt.compareSync(password, User?.password ?? '');
    if (result) {
        const jwtToken = await jwt.sign(User.toJSON(), config.JWT_SECRET || '', {
            expiresIn: config.TOKEN_VALIDATION_PERIOD,
        });
        return { user: User.toJSON(), token: jwtToken };
    } else {
        throw createError(401, { message: 'Incorrect Username of password' });
    }
}
export async function socialLogin(user: any): Promise<Record<string, unknown>> {
    const User = await Users.findOne({ email: user.email });
    if (!User) {
        createNewUser(user as IUsers);
    }
    const token = await jwt.sign(user, config.JWT_SECRET || '', {
        expiresIn: config.TOKEN_VALIDATION_PERIOD,
    });
    return {
        message: `${user.email} successfully logged in.`,
        token,
    };
}
