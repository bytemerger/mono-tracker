export interface Store {
    user: {
        token: string | null;
        name: string;
        id: string
    }
}
export type Action = | { type: 'setToken'; payload: string | null }