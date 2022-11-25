import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../lib/axios";

interface AccountDataProps {
  id: string;
  balance: number;
}

export interface UserDataProps {
  id: string;
  username: string;
  account: AccountDataProps;
}

export interface AuthContextProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  userData: UserDataProps | undefined;
  saveAccessToken: (accessToken: string) => void;
  handleAuthenticate: () => Promise<void>;
  handleLogout: () => void;
}

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserDataProps>();

  const history = useHistory();

  function saveAccessToken(accessToken: string) {
    localStorage.setItem("@ng.cash:accessToken", accessToken);
  }

  function handleLogout() {
    localStorage.removeItem("@ng.cash:accessToken");
    setIsAuthenticated(false);
    history.push("/entrar");
  }

  async function handleAuthenticate() {
    try {
      const accessToken = localStorage.getItem("@ng.cash:accessToken");
      
      api.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
      const { accountData } = await (await api.get("/account")).data;

      setUserData(accountData);
      setIsAuthenticated(true);

    } catch(error: any) {
      const response = error.response.data;
      console.log(response);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await handleAuthenticate();
    })();
  }, []);

  return { 
    isLoading, 
    isAuthenticated, 
    userData, 
    saveAccessToken,
    handleAuthenticate,
    handleLogout 
  }
}
