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
