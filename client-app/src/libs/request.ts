import { NavigateFunction } from "react-router-dom";
import { contextProp } from "../store";
import {
  API_URL,
  LOCAL_STORAGE_KEY_FOR_TOKEN,
  LOCAL_STORAGE_KEY_FOR_USER,
} from "./Constants";

type Method = "GET" | "POST" | "PUT" | "DELETE";

// use ENV
const BASE_URL = API_URL;

export default function useRequest(
  { state, dispatch }: contextProp,
  navigator: NavigateFunction
) {
  let token = state.token;
  if (!state.token) {
    token = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_TOKEN);
    //dispatch({ type: "setToken", payload: token });
  }
  let userId = state.user._id;
  if (!userId) {
    const userString = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_USER);
    if (userString) {
      userId = JSON.parse(userString)["_id"];
    }
  }
  return async (
    url: string,
    method: Method = "GET",
    body?: Record<string, unknown>
  ) => {
    // At refresh there is no userID
    if (url.match("u-id")) {
      url = url.replace("u-id", userId);
    }
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (response.status.toString().startsWith("401")) {
      dispatch({ type: "setToken", payload: null });
      dispatch({
        type: "setNotification",
        payload: { type: "ERROR", message: "Unauthorised Please Login" },
      });
      localStorage.clear();
      navigator("/login");
    }
    return { status: response.status, data: await response.json() };
  };
}
