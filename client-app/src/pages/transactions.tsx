import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionElement from "../components/TransactionItem";
import useRequest from "../libs/request";
import { AppContext } from "../store";
import { Account } from "../types/AccountType";
import { Transaction } from "../types/TransactionType";

type Options = Array<{ value: string; label: string }>;
export default function accounts() {
  const [transaction, setTransactions] = useState<Transaction[]>([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [options, setOptions] = useState<Options>([]);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const request = useRequest(context, navigate);

  const getAllAccounts = async () => {
    return await request(`/users/u-id/accounts`);
  };

  const getNewTransactions = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("ewe want to ger new");
    setCurrentAccount(e.currentTarget.value);
    const transactions = await request(
      `/accounts/${e.currentTarget.value}/transactions`
    );
    setTransactions(transactions.data.data);
  };
  useEffect(() => {
    getAllAccounts().then((result) => {
      let options: Array<{ value: string; label: string }> = [];
      for (const acc of result.data.data.accounts as Array<Account>) {
        options.push({
          value: acc._id,
          label: acc.name,
        });
      }
      setOptions([...options]);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="lg:h-[calc(100vh_-_8px)] overflow-y-scroll h-screen lg:flex-row gap-x-32 gap-y-10">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold">Transactions</h3>
        </div>
        <div className="mt-5 md:w-4/6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">🤩 Results.... 🥵</h3>
            <div>
              <select value={currentAccount} onChange={getNewTransactions}>
                <option selected>Choose one</option>
                {options.map((value) => (
                  <option value={value.value}>{value.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5 [&>*]:mt-4">
            {transaction.map((trans) => {
              return <TransactionElement {...trans} detailed={true} />;
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
