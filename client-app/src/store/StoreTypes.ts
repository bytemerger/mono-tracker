export interface Store {
  user: {
    token: string | null;
    name: string;
    id: string;
  };
  notification: {
    type: null | "ERROR" | "SUCCESS";
    message: string;
  };
}
export type Action =
  | { type: "setToken"; payload: string | null }
  | {
      type: "setNotification";
      payload: { type: Store["notification"]["type"]; message: string };
    };
