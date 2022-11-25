import { useContext, useEffect, useState } from "react";

import * as Icon from "phosphor-react";

import Navbar from "../../components/Navbar";
import Sidemenu from "../../components/Sidemenu";
import BalanceCard from "../../components/BalanceCard";
import TransactionsTable, { TransactionDataProps } from "../../components/TransactionsTable";

import { AuthContext } from "../../contexts/AuthContext";

import Spinner from "../../assets/spinner.svg";

import { api } from "../../lib/axios";

interface TransactionsDataProps {
  cashOutTotal: number;
  cashInTotal: number;
  cashInOutData: TransactionDataProps[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsData, setTransactionsData] = useState<TransactionsDataProps>();

  const { userData, handleLogout } = useContext(AuthContext);

  async function getCashInOutData() {  
    try {
      const transactionDataToday = await api.get("/transactions/today");
      setTransactionsData(transactionDataToday.data);

    } catch (error: any) {
      const response = error.response;

      if (response.status !== 200) handleLogout();

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { getCashInOutData() }, []);

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
                value={userData?.account?.balance || 0}
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
                  accountData={userData} 
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
