import { NavigateFunction } from "react-router-dom";
import { contextProp } from "../store";

type Method = "GET" | "POST" | "PUT" | "DELETE";

// use ENV
const BASE_URL = "http://localhost:3001/api/v1";

export default function useRequest(
  { state, dispatch }: contextProp,
  navigator: NavigateFunction
) {
  const token = state.token;
  
  return async (
    url: string,
    method: Method = "GET",
    body?: Record<string, unknown>
  ) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        mode: 'no-cors',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (response.status.toString().startsWith("401")) {
      dispatch({ type: "setToken", payload: null });
      localStorage.clear();
      navigator("/login");
    }
    return { status: response.status, data: await response.json() };
  };
}
