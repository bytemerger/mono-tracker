import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import useRequest from "../libs/request";
import { AppContext } from "../store";

export default function settings() {
  const context = useContext(AppContext);
  const request = useRequest(context, useNavigate());

  return (
    <DashboardLayout>
      <div className="lg:h-[calc(100vh_-_8px)] h-screen">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold">Settings</h3>
        </div>
        <div className="mt-8 w-4/6 [&>*]:opacity-40">
          <div className="flex flex-col md:flex-row text-sm gap-7 w-full">
            <input
              type="text"
              placeholder="First name"
              className="formInput w-full"
              value={context.state.user.firstName}
              disabled
            />
            <input
              type="text"
              placeholder="Last name"
              value={context.state.user.email}
              className="formInput w-full"
              disabled
            />
          </div>
          <div className="mt-5">
            <input
              type="email"
              placeholder="email"
              value={context.state.user.email}
              className="formInput w-full"
              disabled
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="w-64">
            <div className="text-lg tracking-[2.17px] font-bold text-[#F22828] p-6 bg-[#FFF4F4] mt-14 text-center rounded-xl">
              DELETE ACCOUNT
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
