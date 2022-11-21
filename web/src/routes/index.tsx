import { Switch as Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Transaction from "../pages/Transaction";

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import ErrorPage from "../pages/Error";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" children={<Home />} exact />
      <Route path="/transacoes" children={<Transaction />} />
      <Route path="/cadastrar" children={<SignUp />} />
      <Route path="/entrar" children={<SignIn />} />
      <Route path="*" children={<ErrorPage />} />
    </Routes>
  );
}
