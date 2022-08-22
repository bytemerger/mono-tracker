import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCard from "../components/AccountCard";
import DashboardLayout from "../components/layout/DashboardLayout";
import { LOCAL_STORAGE_KEY_FOR_USER } from "../libs/Constants";
import useRequest from "../libs/request";
import { AppContext } from "../store";
import { Account } from "../types/AccountType";

export default function accounts() {
  const context = useContext(AppContext);
  const request = useRequest(context, useNavigate());
  const [accs, setAccs] = useState<Account[] | null>(null);

  const getAccounts = async () => {
    // parsing the u-id in the request wrapper
    return await request(`/users/u-id/accounts`);
  };

  const unlink = async (id: string) => {
    const body = {
        accountId: id
    }
    const res = await request(`/users/u-id/accounts`,'DELETE', body)
    if (res.status === 200){
        context.dispatch({type:'setNotification', payload: { type: 'SUCCESS', message:'Successfully unlinked account'}})
        setAccs(accs!.filter((account)=> {
            return account._id !== id
        }))
        return
    }
    // Error
    context.dispatch({type:'setNotification', payload: { type: 'ERROR', message:res.data.message}})
  }
  useEffect(() => {
    getAccounts().then((result)=>{
        setAccs(result.data.data.accounts)
    });
  }, []);
  return (
    <DashboardLayout>
      <div className="lg:h-[calc(100vh_-_8px)] overflow-y-scroll h-screen lg:flex-row gap-x-32 gap-y-10">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold">Accounts</h3>
        </div>
        <div className="mt-3">
          {accs?.map((account, index) => {
            return (
              <AccountCard
                account={account}
                unlink={unlink}
                reAuth={() => {}}
              />
            );
          })}
        </div>
        <div className="mx-auto w-64">
            <Link to="/link">
                <div className="text-lg tracking-[2.17px] font-bold text-[#F22828] p-6 bg-[#FFF4F4] mt-14 text-center rounded-xl">
                LINK BANK ACCOUNT
                </div>
            </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
