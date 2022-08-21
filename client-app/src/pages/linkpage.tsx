import Connect from "@mono.co/connect.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { MONO_PUBLIC_KEY } from "../libs/Constants";
import useRequest from "../libs/request";
import { AppContext } from "../store";

export default function linkpage() {
  const context = useContext(AppContext);
  console.log(context.state.user);
  const navigate = useNavigate();
  const request = useRequest(context, navigate);
  const link = () => {
    const monoInstance = new Connect({
      key: MONO_PUBLIC_KEY,
      onSuccess: async (monoData: any) => {
        const { status, data } = await request(
          `/users/${context.state.user._id}/accounts`,
          "PUT",
          { token: monoData.code }
        );
        if (status === 200) {
          context.dispatch({
            type: "setNotification",
            payload: {
              type: "SUCCESS",
              message: "Account successfully Linked",
            },
          });
          navigate("/dashboard");
          return;
        }
        context.dispatch({
          type: "setNotification",
          payload: {
            type: "ERROR",
            message: "An Error Occured Please try again",
          },
        });
      },
      onClose: () => console.log("widget has been closed"),
    });
    monoInstance.setup();
    monoInstance.open();
  };
  return (
    <DashboardLayout>
      <div className="lg:h-[calc(100vh_-_8px)] h-screen">
        <div className="flex items-center justify-center h-4/6">
          <div className="md:w-[393px] w-full bg-black rounded-lg flex flex-col items-center text-center py-8">
            <div>
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2857 27.8571V19.2857C19.2857 16.4441 20.4145 13.7189 22.4239 11.7096C24.4332 9.70023 27.1584 8.57141 30 8.57141C32.8416 8.57141 35.5668 9.70023 37.5761 11.7096C39.5855 13.7189 40.7143 16.4441 40.7143 19.2857V27.8571M15 27.8571H45C47.3669 27.8571 49.2857 29.7759 49.2857 32.1428V47.1428C49.2857 49.5098 47.3669 51.4286 45 51.4286H15C12.6331 51.4286 10.7143 49.5098 10.7143 47.1428V32.1428C10.7143 29.7759 12.6331 27.8571 15 27.8571Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-white mt-2">
              <div className="text-3xl">Final Step</div>
              <div className="mt-4 text-base">
                Link your Bank Account in Seconds
              </div>
            </div>
            <div
              className="flex items-center text-[#182CD1] text-lg font-bold bg-white py-1.5 px-4 rounded-md mt-14"
              onClick={link}
            >
              <span className="mr-1">LINK NOW</span>
              <span>
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 13L10 5"
                    stroke="#182CD1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 5H10V13"
                    stroke="#182CD1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
