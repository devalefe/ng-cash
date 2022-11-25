import { useContext } from "react";
import AppRoutes from "./routes";

import { AuthContext } from "./contexts/AuthContext";

import Spinner from "./assets/spinner.svg";

export default function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <img className="m-auto w-24 h-24" src={Spinner} alt="Loading..." />
      </div>
    );
  }

  return <AppRoutes />;
}
