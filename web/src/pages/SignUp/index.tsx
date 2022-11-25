import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as Icon from "phosphor-react";

import ErrorMessage, { parseErrorMessage } from "../../components/ErrorMessage";

import { AuthContext } from "../../contexts/AuthContext";

import { api } from "../../lib/axios";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { saveAccessToken, handleAuthenticate } = useContext(AuthContext);

  const history = useHistory();

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      const { username, password } = event.target;
      const payload = { username: username.value, password: password.value };

      const response = await (await api.post("/signup", payload)).data;
      const { accessToken } = response;

      saveAccessToken(accessToken);
      await handleAuthenticate();
      history.push("/");

    } catch (error: any) {
      const response = error.response.data.message;
      setMessage(parseErrorMessage(response));

    } finally {
      setIsLoading(false);
    }
  }

  return(
    <div className="bg-white flex rounded-md overflow-hidden shadow-lg m-auto">
      <div className="bg-black text-gray-100 p-14 w-80">
        <h1 className="text-2xl font-bold pb-8">
          Como funciona a <br /> <strong>NG.CA$H</strong> ?
        </h1>

        <h5 className="text-base font-bold pb-6">
          Um pacote de benefícios.
        </h5>

        <ul className="flex flex-col gap-5">
          <li className="flex items-center gap-3">
            <Icon.Check size={16} /> Conta grátis
          </li>
          <li className="flex items-center gap-3">
            <Icon.Check size={16} /> Cartão físico grátis
          </li>
          <li className="flex items-center gap-3">
            <Icon.Check size={16} /> Cartão virtual grátis
          </li>
          <li className="flex items-center gap-3">
            <Icon.Check size={16} /> Mesada programada
          </li>
        </ul>
      </div>
      
      <div className="p-14 w-[432px]">
        <h1 className="text-3xl font-bold mb-6">Cadastrar-se</h1>

        <ErrorMessage message={message} clearMessage={() => setMessage(null)} />

        <form className="w-80 mt-6" onSubmit={handleSubmit}>
          <label className="text-base font-bold pb-1" htmlFor="username">Usuário</label>
          <div className="flex gap-2 pl-2 items-center mb-6 rounded-md border border-gray-300">
            <Icon.At size={16} />
            <input
              className="block p-1 outline-none bg-transparent"
              type="text"
              name="username"
              id="username"
              placeholder="johndoe"
            />
          </div>

          <label className="text-base font-bold pb-1" htmlFor="password">Senha</label>
          <div className="flex gap-2 pl-2 items-center mb-9 rounded-md border border-gray-300">
            <Icon.Key size={16} />
            <input 
              className="block p-1 outline-none bg-transparent"
              type="password"
              name="password"
              id="password"
              placeholder="********"
            />
          </div>

          <button 
            className="bg-black text-gray-100 w-full p-2 mb-8 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            Cadastrar
          </button>

          <span className="text-sm">
            Já tem uma conta? 
            <Link to="/entrar" className="text-amber-500 ml-2 hover:underline hover:decoration-1">
              Entre aqui.
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
