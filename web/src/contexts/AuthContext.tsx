import { createContext, ReactNode } from "react";
import useAuth, { AuthContextProps } from "../hooks/useAuth";

interface ProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export default function AuthContextProvider({ children }: ProviderProps) {
  const { 
    isLoading, 
    isAuthenticated, 
    userData,
    saveAccessToken, 
    handleAuthenticate,
    handleLogout
  } = useAuth();

  return(
    <AuthContext.Provider value={{
      isLoading, 
      isAuthenticated, 
      userData,
      saveAccessToken, 
      handleAuthenticate,
      handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
