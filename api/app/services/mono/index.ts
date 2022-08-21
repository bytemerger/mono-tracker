import got from 'got';
import config from '../../../config/secret';
import MonoError from './MonoError';

const BASEURL = 'https://api.withmono.com';

export async function unlinkAccount(accountId: string) {
    const result = await got.post(`${BASEURL}/accounts/${accountId}/unlink`, {
        headers: {
            'mono-sec-key': config.MONO_SEC_KEY,
        },
        throwHttpErrors: false,
    });
    if (result.statusCode === 200) return true;

    throw new MonoError(result.statusCode, JSON.parse(result.body).message);
}

export async function authAccount(token: string) {
    const result = await got.post(`${BASEURL}/account/auth`, {
        headers: {
            'mono-sec-key': config.MONO_SEC_KEY,
        },
        json: {
            code: token,
        },
        throwHttpErrors: false,
    });
    console.log(result.body);
    if (result.statusCode === 200) return JSON.parse(result.body);

    throw new MonoError(result.statusCode, JSON.parse(result.body).message);
}
