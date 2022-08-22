import React, { useEffect, useMemo, useReducer } from "react";
import {
  LOCAL_STORAGE_KEY_FOR_TOKEN,
  LOCAL_STORAGE_KEY_FOR_USER,
} from "../libs/Constants";
import { Store, Action } from "./StoreTypes";

const generateInitalState: () => Store = () => ({
  user: {
    firstName: "",
    lastName: "",
    _id: "",
    email: "",
    accounts: [],
  },
  token: null,
  notification: {
    type: null,
    message: "",
  },
});
const initialState = generateInitalState();

function reducerFunc(state: typeof initialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "setToken":
      return {
        ...state,
        token: payload,
      };
    case "setNotification":
      return {
        ...state,
        notification: payload,
      };
    case "setUser":
      return {
        ...state,
        user: { ...payload },
      };
    case "resetState":
      return {
        ...generateInitalState(),
      };
    default:
      throw new Error();
  }
}

export type contextProp = {
  state: Store;
  dispatch: React.Dispatch<Action>;
};
export const AppContext = React.createContext<contextProp>({
  state: initialState,
  dispatch: () => {},
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  useEffect(() => {
    if (!state.token) {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_TOKEN);
      dispatch({ type: "setToken", payload: token });
    }
    if (!state.user._id) {
      const userString = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_USER);
      if (userString) {
        const user = JSON.parse(userString);
        delete user.createdAt;
        dispatch({ type: "setUser", payload: user });
      }
    }
  }, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
