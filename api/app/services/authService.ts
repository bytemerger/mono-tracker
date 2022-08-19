import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../../config/secret';
import Users, { IUser } from '../models/Users';
import { createNewUser } from './userService';
import { LeanDocument } from 'mongoose';

export async function Login(
    email: string,
    password: string,
): Promise<{
    user: LeanDocument<IUser>;
    token: string;
}> {
    const User = await Users.findOne({ email }).select({ accounts: 0, __v: 0, updatedAt: 0 });
    if (!User) {
        throw createError(400, { message: 'Incorrect Username or password' });
    }
    //check password
    const result = bcrypt.compareSync(password, User?.password ?? '');
    if (result) {
        const jwtToken = await jwt.sign(User.toJSON(), config.JWT_SECRET || '', {
            expiresIn: config.TOKEN_VALIDATION_PERIOD,
        });
        return { user: User.toJSON(), token: jwtToken };
    } else {
        throw createError(401, { message: 'Incorrect Username or password' });
    }
}
