export interface Account{
    _id: string;
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
    owner: string;
}