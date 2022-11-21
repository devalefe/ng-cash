import { ChangeEvent, useState } from "react";

import * as Icon from "phosphor-react";

import ErrorMessage, { parseErrorMessage } from "../ErrorMessage";

import { api } from "../../lib/axios";

interface ModalProps {
  modalVisible: boolean;
  toggleModal: () => void;
  getTransactionsByFilter: () => void;
}

export default function ModalTransaction({ modalVisible, toggleModal, getTransactionsByFilter }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(null);

  const [username, setUsername] = useState<string | null>();
  const [value, setValue] = useState<string | null>();

  function handleToggleModal() {
    setMessage(null);
    toggleModal();
  }

  function handleSetUsername(event: ChangeEvent<HTMLInputElement>) {
    let usernameSanitized = event.target.value.replace(/[^a-zA-Z]/g, "");
    setUsername(usernameSanitized.toLowerCase());
  }

  function handleSetValue(event: ChangeEvent<HTMLInputElement>) {
    let valueSanitized = event.target.value.replace(/\D/g, "");
    valueSanitized = valueSanitized.replace(/(\d)(\d{2})$/, "$1,$2");
    valueSanitized = valueSanitized.replace(/(?=(\d{3})+(\D))\B/g, ".");
    setValue(valueSanitized);
  }

  async function handleSubmit(event: any) {
    try {
      event.preventDefault();
      setIsLoading(true);

      let _value = value?.replace(/\D/g, "");
      _value = _value?.replace(/(\d)(\d{2})$/, "$1.$2");

      const payload = { username, value: Number(_value) };
      await (await api.post("/transactions/new", payload)).data;

      setValue(undefined);
      setUsername(undefined);

      getTransactionsByFilter();
      handleToggleModal();
      
    } catch (error: any) {
      const response = error.response.data.message;
      setMessage(parseErrorMessage(response));

    } finally {
      setIsLoading(false);
    }
  }

  if(!modalVisible) return <></>;

  return (
    <div className="bg-black bg-opacity-75 absolute h-full w-full z-10">
      <div className="bg-white w-[400px] flex flex-col gap-7 m-auto mt-14 p-7 shadow-md rounded-md">
        <h1 className="text-center text-2xl font-bold">Nova transferência</h1>

        <ErrorMessage message={message} clearMessage={() => setMessage(null)}/>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col flex-1 justify-center">
            <label htmlFor="username">Nome de usuário</label>
            <div className="flex items-center border border-gray-300 p-2 mb-3 rounded-md">
              <Icon.At size={16} />
              <input 
                className="flex-1 outline-none ml-2" 
                type="text" 
                name="username" 
                id="username" 
                placeholder="richard" 
                onChange={handleSetUsername}
                value={username || ""}
              />
            </div>

            <label htmlFor="value">Valor a transferir</label>
            <div className="flex items-center border border-gray-300 p-2 mb-3 rounded-md">
              <Icon.CurrencyDollar size={16} />
              <input 
                className="flex-1 outline-none ml-2" 
                type="text"
                name="value" 
                id="value" 
                placeholder="0,00"
                onChange={handleSetValue}
                value={value || ""}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span 
              className="
              bg-red-600 text-gray-100 flex 
              items-center gap-2 p-3 pr-6 text-xs rounded-md 
              cursor-pointer hover:bg-red-700"
              onClick={handleToggleModal}
            >
              <Icon.X size={16} /> <span>Fechar</span>
            </span>

            <button 
              type="submit"
              className="
              bg-green-600 text-gray-100 flex items-center 
              gap-2 p-3 pr-6 text-xs rounded-md 
              hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <Icon.Check size={16} />
              <span>Confirmar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
