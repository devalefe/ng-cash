import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import * as Icon from "phosphor-react";

import Navbar from "../../components/Navbar";
import Sidemenu from "../../components/Sidemenu";
import BalanceCard from "../../components/BalanceCard";
import TransactionsTable, { TransactionDataProps } from "../../components/TransactionsTable";

import Spinner from "../../assets/spinner.svg";

import useAuth from "../../hooks/useAuth";

import { api } from "../../lib/axios";

export interface UserDataProps {
  id: string;
  username: string;
  account: {
    id: string;
    balance: number;
  }
}

interface TransactionsDataProps {
  cashOutTotal: number;
  cashInTotal: number;
  cashInOutData: TransactionDataProps[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsData, setTransactionsData] = useState<TransactionsDataProps>();

  const { getAccessToken, clearAccessToken, setAccountData, accountData } = useAuth();

  const history = useHistory();

  async function getUserData() {
    const accessToken = getAccessToken();

    if(!accessToken) {
      history.push("/entrar");
    }
    
    try {
      api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

      const [
        { accountData }, 
        { cashOutTotal, cashInTotal, cashInOutData }
      ] = await Promise.all([
        await (await api.get("/account")).data,
        await (await api.get("/transactions/today")).data
      ]);

      setAccountData(accountData);
      setTransactionsData({
        cashOutTotal,
        cashInTotal,
        cashInOutData
      });

    } catch (error: any) {
      const response = error.response.data.code;

      if(
        response === "FAST_JWT_MALFORMED" ||
        response === "FST_JWT_AUTHORIZATION_TOKEN_INVALID"
      ) {
        clearAccessToken();
        history.push("/entrar");
      }

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-1">
      <Sidemenu activeItem="Dashboard" />

      <div className="flex flex-1 flex-col h-full">
        <Navbar title="Dashboard" />

        {isLoading ? 
          <div className="flex h-full">
            <img className="m-auto w-24 h-24" src={Spinner} alt="Loading..." />
          </div> :

          <main className="p-7 flex flex-col gap-7 max-h-full h-full overflow-hidden">
            <div className="flex gap-7">
              <BalanceCard
                cardBg="bg-black"
                iconBg="bg-gray-500"
                valueColor="text-gray-100"
                title="Balanço total"
                icon={<Icon.Wallet size={24} />}
                value={accountData?.account?.balance || 0}
              />

              <BalanceCard
                cardBg="bg-white"
                iconBg="bg-gray-150"
                valueColor="text-green-600"
                title="Entrada de hoje"
                icon={<Icon.TrendUp size={24} />}
                value={transactionsData?.cashInTotal || 0}
              />

              <BalanceCard
                cardBg="bg-white"
                iconBg="bg-gray-150"
                valueColor="text-red-600"
                title="Saída de hoje"
                icon={<Icon.TrendDown size={24} />}
                value={transactionsData?.cashOutTotal || 0}
              />
            </div>

            <div className="bg-white p-6 rounded-md shadow-md h-full overflow-hidden">
              <h1 className="text-lg font-bold text-center pb-4 border-b border-gray-200">
                Transações de hoje
              </h1>

              <div className="h-[87%] overflow-y-auto">
                <TransactionsTable 
                  accountData={accountData} 
                  transactions={transactionsData?.cashInOutData}
                />
              </div>
            </div>
          </main>
        }
      </div>
    </div>
  );
}
