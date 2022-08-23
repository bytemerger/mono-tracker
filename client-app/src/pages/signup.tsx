import React, { useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import useRequest from "../libs/request";
import { AppContext } from "../store";

export default function Signup() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const request = useRequest(context, navigate);
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  type Reducer = {
    state: typeof initialFormState;
    action: { type: keyof typeof initialFormState; payload: string };
  };
  const [formState, dispatchForm] = useReducer(
    (formState: Reducer["state"], action: Reducer["action"]) => {
      const { type, payload } = action;
      switch (type) {
        case "firstName":
          return { ...formState, firstName: payload };
        case "lastName":
          return { ...formState, lastName: payload };
        case "email":
          return { ...formState, email: payload };
        case "password":
          return { ...formState, password: payload };
        default:
          throw new Error();
      }
    },
    initialFormState
  );
  const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.password || !formState.firstName || !formState.lastName) {
      context.dispatch({
        type: "setNotification",
        payload: {
          type: "ERROR",
          message: "Please input the correct details to signup",
        },
      });
      return;
    }
    const { status, data } = await request("/users", "POST", formState);
    if (status === 200) {
      navigate("/login");
      context.dispatch({
        type: "setNotification",
        payload: {
          type: "SUCCESS",
          message: "Successfully Signed up... login in to access your account",
        },
      });
    }
    if (status === 400) {
      context.dispatch({
        type: "setNotification",
        payload: {
          type: "ERROR",
          message: data.message,
        },
      });
    }
  };
  return (
    <div className="flex h-screen justify-center items-center w-full">
      <div className="rounded-xl bg-white w-[90%] lg:w-[609px] lg:h-[574px] py-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <Logo size="" color="dark" />
          <div className="text-[#101010] md:mt-6 mt-4 text-[15px]">
            Track all your bank expenses in one place
          </div>
        </div>
        <div className="mt-10 w-5/6 md:w-auto">
          <form onSubmit={submitSignup}>
            <div className="flex flex-col md:flex-row text-sm gap-7">
              <input
                type="text"
                placeholder="First name"
                className="formInput"
                onChange={(e) => {
                  dispatchForm({ type: "firstName", payload: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="Last name"
                className="formInput"
                onChange={(e) => {
                  dispatchForm({ type: "lastName", payload: e.target.value });
                }}
              />
            </div>
            <div className="mt-5">
              <input
                type="email"
                placeholder="email"
                className="formInput w-full"
                onChange={(e) => {
                  dispatchForm({ type: "email", payload: e.target.value });
                }}
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="password"
                className="formInput w-full"
                onChange={(e) => {
                  dispatchForm({ type: "password", payload: e.target.value });
                }}
              />
            </div>
            <div className="mt-16 text-[17px]">
              <input
                type="submit"
                value="GET STARTED"
                className="rounded-md text-white bg-[#182CD1] py-3 w-full"
              />
            </div>
          </form>
          <Link to="/login">
            <div className="text-[#182CD1] text-sm mt-9">
              Already have an account? Sign in
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
