import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import {
  LOCAL_STORAGE_KEY_FOR_TOKEN,
  LOCAL_STORAGE_KEY_FOR_USER,
} from "../libs/Constants";
import useRequest from "../libs/request";
import { AppContext } from "../store";

export default function login() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const request = useRequest({ state, dispatch }, navigate);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      dispatch({
        type: "setNotification",
        payload: { type: "ERROR", message: "Input Username or password" },
      });
      return
    }
    const body = {
      email,
      password,
    };
    const { status, data } = await request("/login", "POST", body);
    if (status === 200) {
      dispatch({ type: "setToken", payload: data.token });
      dispatch({ type: "setUser", payload: data.user });
      localStorage.setItem(LOCAL_STORAGE_KEY_FOR_TOKEN, data.token);
      localStorage.setItem(
        LOCAL_STORAGE_KEY_FOR_USER,
        JSON.stringify(data.user)
      );
      navigate('/dashboard')
      return;
    }
    // There was an error
    dispatch({
      type: "setNotification",
      payload: { type: "ERROR", message: data.message },
    });
  };
  return (
    <div className="flex h-screen justify-center items-center w-full">
      <div className="rounded-xl bg-white w-[90%] lg:w-[609px] lg:h-[501px] py-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <Logo size="" color="dark" />
          <div className="text-[#101010] md:mt-6 text-[15px]">
            Securely login to your account
          </div>
        </div>
        <div className="mt-10 w-5/6 lg:w-[352px]">
          <form onSubmit={submitForm}>
            <div className="">
              <input
                type="email"
                placeholder="email"
                className="formInput-login"
                onChange={(e) => { setEmail(e.target.value)}}
              />
            </div>
            <div className="mt-3">
              <input
                type="password"
                placeholder="password"
                className="formInput-login"
                onChange={(e) => { setPassword(e.target.value)}}
              />
            </div>
            <div className="flex justify-between mt-6 text-[13px] leading-[14px] text-[#101010] opacity-70">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="customCheck"
                  className="w-5 h-5 appearance-none border shadow-xl rounded-sm shadow-black border-black/5 mr-1 grid place-content-center"
                />
                <label htmlFor="customCheck" className="">
                  Remember me
                </label>
              </div>
              <div className="">I forgot my password</div>
            </div>
            <div className="mt-7 text-[17px]">
              <input
                type="submit"
                value="LOG IN"
                className="rounded-md text-white bg-[#6979F8] py-3 w-full"
              />
            </div>
          </form>
          <Link to="/signup">
            <div className="text-[#182CD1] text-sm mt-9">
              Don’t have an account? Sign up
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
