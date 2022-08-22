import CalendarIcon from "../components/CalendarIcon";
import ExpenseStat from "../components/ExpenseStat";
import AccountGroupItem from "../components/AccountGroupItem";
import TransactionElement from "../components/TransactionItem";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";
import useRequest from "../libs/request";
import { Link, useNavigate } from "react-router-dom";
import { Transaction } from "../types/TransactionType";
import { Account } from "../types/AccountType";

export default function dashboard() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const { state, dispatch } = context;
  const request = useRequest(context, navigate);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalance, setTotalBalance] = useState("");

  const getLatestTransaction = async () => {
    return await request(`/users/u-id/transactions?perPage=15`);
  };
  const getAccounts = async () => {
    return await request(`/users/u-id/accounts`);
  };
  useEffect(() => {
    getAccounts().then((result) => {
      if (result.status === 200) {
        if (result.data.data.totalBalance < 1) {
          dispatch({
            type: "setNotification",
            payload: { type: "ERROR", message: "Please Link an account" },
          });
          navigate("/link");
          return;
        }
        setAccounts(result.data.data.accounts);
        setTotalBalance(result.data.data.totalBalance);
      }
    });
    getLatestTransaction().then((result) => {
      if (result.status === 200) {
        setTransactions(result.data.data);
      }
    });
  }, []);
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:h-[calc(100vh_-_40px)] pb-6 lg:flex-row gap-x-32 gap-y-10">
        <div className="">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gray-400 mr-1 flex justify-center items-center">
                {state.user.firstName[0] + state.user.lastName[0]}
              </div>
              <div className="text-base tracking-[0.3px] text-[#262A41]">
                Good morning, {state.user.firstName}
              </div>
            </div>
            <div className="rounded-md md:flex gap-2 items-center px-2 py-1 border border-[#D1D6DE] hidden">
              <div>Today</div>
              <div>
                <CalendarIcon />
              </div>
            </div>
          </div>
          {/* The expense chart */}
          <div className="text-center mt-6">
            <h4 className="text-[22px] leading-10 font-bold text-[#262A41] tracking-[0.6px]">
              Expense Tracker
            </h4>
            <div className="mt-6 w-[95%] md:w-auto mx-auto md:mx-0">
              <ExpenseStat />
            </div>
          </div>
          {/* Latest transactions */}
          <div className="mt-12">
            <div className="flex items-center justify-between pb-[10px] border-b-[0.54px] border-[#DEDEDE]">
              <div className="text-[23px] text-[#262A41] leading-[32px]">
                Latest Transaction
              </div>
              <div>
                <svg
                  width="28"
                  height="6"
                  viewBox="0 0 28 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="3.04952"
                    cy="2.68627"
                    rx="2.77022"
                    ry="2.68627"
                    fill="#D8D8D8"
                  />
                  <ellipse
                    cx="14.1305"
                    cy="2.68627"
                    rx="2.77022"
                    ry="2.68627"
                    fill="#D8D8D8"
                  />
                  <ellipse
                    cx="25.2114"
                    cy="2.68627"
                    rx="2.77022"
                    ry="2.68627"
                    fill="#D8D8D8"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-8 [&>*]:mt-6 overflow-y-scroll h-[300px]">
              {transactions.map((acc) => (
                <TransactionElement {...acc} />
              ))}
            </div>
          </div>
          <Link to="/transactions">
            <div className="mt-7 opacity-50 text-center">VIEW ALL {">"}</div>
          </Link>
        </div>
        <div>
          {/* balance card */}
          <div className="text-[#273240] flex flex-col items-center rounded-lg lg:w-[361px] cardShadow py-7">
            <div className="text-xl font-bold tracking-[.496px]">
              TOTAL BALANCE
            </div>
            <div className="text-5xl font-bold tracking-[.496px]">
              ₦{parseInt(totalBalance) / 100}
            </div>
            <div className="text-[17px] text-[#404852] tracking-[0.64px]">
              Your balance across all Banks
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="flex items-center [&>*]:-ml-2">
                <div className="w-9 h-9 rounded-full bg-red-400"></div>
                <div className="w-9 h-9 rounded-full bg-blue-400"></div>
                <div className="w-9 h-9 rounded-full bg-green-400"></div>
              </div>
              <Link to="/link">
                <div className="w-9 h-9 rounded-full border border-black/20 flex justify-center items-center">
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.16193 0.935425V14.1563"
                      stroke="#D2DCE8"
                      stroke-width="1.19355"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.53931 7.5459L14.7844 7.5459"
                      stroke="#D2DCE8"
                      stroke-width="1.19355"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            <Link to="/accounts">
              <div className="text-lg tracking-[2.17px] font-bold text-[#F22828] p-6 bg-[#FFF4F4] mt-14 text-center rounded-xl">
                UNLINK BANK ACCOUNT
              </div>
            </Link>
          </div>
          <div className="mt-14">
            <div className="flex justify-between pb-[14px] border-b-[0.54px] border-[#DEDEDE]">
              <div className="text-[19px] font-bold text-[#262A41] leading-[20px]">
                Where your money is?
              </div>
              <div>
                <svg
                  width="28"
                  height="6"
                  viewBox="0 0 28 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="3.04952"
                    cy="2.68627"
                    rx="2.77022"
                    ry="2.68627"
                    fill="#D8D8D8"
                  />
                  <ellipse
                    cx="14.1305"
                    cy="2.68627"
                    rx="2.77022"
                    ry="2.68627"
                    fill="#D8D8D8"
                  />
                  <ellipse
                    cx="25.2114"
                    cy="2.68627"
                    rx="2.77022"
                    ry="2.68627"
                    fill="#D8D8D8"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-5 [&>*]:mt-5">
              {accounts.map((acc) => {
                return (
                  <AccountGroupItem
                    {...acc}
                    percentage={
                      parseInt(totalBalance) / (parseInt(acc.balance) / 100)
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
