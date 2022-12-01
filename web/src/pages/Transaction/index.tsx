import { useContext, useEffect, useState } from "react";

import * as Icon from "phosphor-react";

import Navbar from "../../components/Navbar";
import Sidemenu from "../../components/Sidemenu";
import ModalTransaction from "../../components/ModalTransaction";
import TransactionsTable, { TransactionDataProps } from "../../components/TransactionsTable";

import { AuthContext } from "../../contexts/AuthContext";

import Spinner from "../../assets/spinner.svg";

import { api } from "../../lib/axios";

export default function Transactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState<TransactionDataProps[]>();
  
  const { userData, handleLogout } = useContext(AuthContext);

  async function getTransactionsByFilter(initialDate="", finalDate="", type="") {
    setIsLoading(true);

    try {
      const payload = { initialDate, finalDate, type };
      const { cashInOutData } = await (await api.post("/transactions", payload)).data;

      setTransactions(cashInOutData);

    } catch(error: any) {
      const response = error.response;

      if (response.status === 401 || response.status === 403) handleLogout();

    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const { initialDate, finalDate, type } = event.currentTarget;
    getTransactionsByFilter(initialDate.value, finalDate.value, type.value);
  }

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  useEffect(() => { getTransactionsByFilter() }, []);

  return (
    <div className="flex flex-1">
      <ModalTransaction
        toggleModal={toggleModal} 
        modalVisible={modalVisible}
        getTransactionsByFilter={getTransactionsByFilter}
      />

      <Sidemenu activeItem="Transactions" />

      <div className="flex flex-1 flex-col h-full">
        <Navbar title="Transações" />

        <main className="p-7 flex max-h-full h-full overflow-hidden">
          <div className="bg-white w-full h-full overflow-y-auto rounded-md p-7 shadow-md">
            <div className="border-gray-300 flex items-center justify-between mb-5">
              <form className="flex gap-3 items-center" onSubmit={handleSubmit}>
                <select 
                  className="bg-white text-black border-gray-300 border outline-none 
                  p-[10px] text-xs rounded-md" 
                  name="type" 
                  id="type"
                >
                  <option value="">Todos</option>
                  <option value="cashIn">Entrada</option>
                  <option value="cashOut">Saída</option>
                </select>
                <span className="text-gray-text-xs">de</span>
                <input
                  name="initialDate"
                  type="date"
                  className="bg-transparent text-black border-gray-300 border 
                  py-[8px] px-2 rounded-md text-sm outline-none"
                />
                <span className="text-gray-text-xs">até</span>
                <input
                  name="finalDate"
                  type="date"
                  className="bg-transparent text-black border-gray-300 border 
                  py-[8px] px-2 rounded-md text-sm outline-none"
                />
                <button 
                  className="bg-black text-gray-100 w-24 py-3 text-xs rounded-md 
                  disabled:bg-gray-500 disabled:cursor-not-allowed" 
                  disabled={isLoading}
                  type="submit"
                >
                  Aplicar filtro
                </button>
              </form>
              <button 
                className="bg-green-600 text-gray-100 flex items-center 
                gap-2 ml-3 p-3 pr-6 text-xs rounded-md"
                onClick={toggleModal}
              >
                <Icon.Plus size={16} /> <span>Transferir</span>
              </button>
            </div>

            <div className="h-[87%] overflow-y-auto">
              {isLoading ? 
                <div className="flex h-full">
                  <img className="m-auto w-24 h-24" src={Spinner} alt="Loading..." />
                </div> :
                <TransactionsTable 
                  accountData={userData} 
                  transactions={transactions}
                />
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
