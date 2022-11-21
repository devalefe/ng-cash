import { createContext, ReactNode, useState } from "react";

import { UserDataProps } from "../pages/Home";

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
    return token
  }

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
