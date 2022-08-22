import got from 'got';
import config from '../../../config/secret';
import { getMonthDatePair } from '../../helpers/dateHelper';
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
    if (result.statusCode === 200) return JSON.parse(result.body);

    throw new MonoError(result.statusCode, JSON.parse(result.body).message);
}

export async function getAccount(accId: string) {
    return await got
        .get(`${BASEURL}/accounts/${accId}`, {
            headers: {
                'mono-sec-key': config.MONO_SEC_KEY,
            },
            throwHttpErrors: false,
        })
        .json();
}

export async function getTransactions(accId: string) {
    // get transaction atleast one month old
    const dates = getMonthDatePair();
    return await got
        .get(`${BASEURL}/accounts/${accId}/transactions?paginate=false&start=${dates.monthAgo}&end=${dates.today}`, {
            headers: {
                'mono-sec-key': config.MONO_SEC_KEY,
            },
            throwHttpErrors: false,
        })
        .json();
}

export async function refreshTrans(accId: string) {
    return await got
        .post(`${BASEURL}/accounts/${accId}/sync`, {
            headers: {
                'mono-sec-key': config.MONO_SEC_KEY,
            },
            throwHttpErrors: false,
        })
        .json();
}
