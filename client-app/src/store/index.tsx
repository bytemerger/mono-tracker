import React, { useEffect, useReducer } from "react";
import { LOCAL_STORAGE_KEY_FOR_TOKEN } from "../libs/Constants";
import { Store, Action } from "./StoreTypes";

const generateInitalState: () => Store = () => ({
  user: {
    token: null,
    name: "",
    id: "",
  },
});
const initialState = generateInitalState();

function reducerFunc(state: typeof initialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "setToken":
      return {
        ...state,
        user: {
          ...state.user,
          token: payload,
        },
      };
    default:
      throw new Error();
  }
}

type contextProp = {
  state: Store;
  dispatch?: React.Dispatch<Action>;
};
export const AppContext = React.createContext<contextProp>({
  state: initialState,
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  useEffect(() => {
    if (!state.user.token) {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_TOKEN);
      dispatch({ type: "setToken", payload: token });
    }
  }, []);

  const value = {
    state,
    dispatch,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
