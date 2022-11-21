import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}