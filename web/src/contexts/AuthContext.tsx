import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../lib/axios";

export interface AuthContextProps {
  saveAccessToken: (_accessToken: string) => void;
  clearAccessToken: () => void;
  getAccessToken: () => string | null;

  setAccountData: (data: UserDataProps) => void;
  accountData: UserDataProps | undefined;
}

interface ProviderProps {
  children: ReactNode;
}

export interface UserDataProps {
  id: string;
  username: string;
  account: {
    id: string;
    balance: number;
  }
}


export const AuthContext = createContext({} as AuthContextProps);

export default function AuthContextProvider({ children }: ProviderProps) {
  const [accountData, setAccountData] = useState<UserDataProps | undefined>();

  function saveAccessToken(_accessToken: string) {
    localStorage.setItem("@ng.cash:accessToken", _accessToken);
  }

  function clearAccessToken() {
    localStorage.removeItem("@ng.cash:accessToken");
  }

  function getAccessToken() {
    const token = localStorage.getItem("@ng.cash:accessToken");
    return token;
  }

  async function getAccountData() {
    const { accountData } =  await (await api.get("/account")).data;
    setAccountData(accountData);
  }

  useEffect(() => { getAccountData() }, []);

  return(
    <AuthContext.Provider value={{
      clearAccessToken,
      saveAccessToken,
      getAccessToken,
      setAccountData,
      accountData
    }}>
      {children}
    </AuthContext.Provider>
  );
}
