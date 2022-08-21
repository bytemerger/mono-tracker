export interface Store {
  user: {
    email: string;
    _id: string;
    accounts: [];
    firstName: string;
    lastName: string;
  };
  token: string | null;
  notification: {
    type: null | "ERROR" | "SUCCESS";
    message: string;
  };
}
export type Action =
  | { type: "setToken"; payload: string | null }
  | { type: "setUser"; payload: Store["user"] }
  | {
      type: "setNotification";
      payload: { type: Store["notification"]["type"]; message: string };
    };
