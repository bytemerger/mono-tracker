import Logo from "../Logo";
import closeIcon from "../../assets/closeIcon.svg";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../store";

interface props {
  menuState: boolean;
  setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBar({ menuState, setMenuState }: props) {
  // active route
  const [active, setActive] = useState("");

  const navigate = useNavigate();

  const { state, dispatch } = useContext(AppContext);

  const Logout = () => {
    dispatch({ type: "resetState", payload: null });
    localStorage.clear();
    navigate("/login");
    dispatch({
      type: "setNotification",
      payload: { type: "SUCCESS", message: "Successfully logged out" },
    });
  };
  useEffect(() => {
    const route = window.location.pathname.toString().slice(1).split("/")[0];
    setActive(route);
  }, [window.location.pathname]);
  return (
    <>
      {menuState && <div className="absolute inset-0 bg-black z-10"></div>}
      {menuState && (
        <div
          className="fixed z-50 top-7 right-4"
          onClick={() => setMenuState(false)}
        >
          <img src={closeIcon} alt="" />
        </div>
      )}
      <div
        className={`flex flex-col px-14 py-16 fixed md:static left-0 top-0 ${
          menuState
            ? "translate-x-0 z-50"
            : "-translate-x-full md:translate-x-0"
        } transition-all duration-100`}
      >
        <Logo size="" color="light" />
        <ul className="text-[22px] leading-[35px] mt-12 text-white/50 [&>*]:mt-7 [&>*]:cursor-pointer">
          <li className={`${active === "dashboard" && "text-white"}`}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={`${active === "transactions" && "text-white"}`}>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li className={`${active === "accounts" && "text-white"}`}>
            <Link to="/accounts">Accounts</Link>
          </li>
          <li className={`${active === "settings" && "text-white"}`}>
            <Link to="/settings">Settings</Link>
          </li>
          <li className={`${active === "settings" && "text-white"}`}>
            <div
              className="text-base tracking-[2.17px] font-bold text-[#F22828] p-2 bg-[#FFF4F4] mt-14 text-center rounded-xl"
              onClick={Logout}
            >
              Sign Out
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
export default SideBar;
