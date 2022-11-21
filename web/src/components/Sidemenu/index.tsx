import { Link, useHistory } from "react-router-dom";

import * as Icon from "phosphor-react";

import ngcashLogo from "../../assets/ngcash-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface SidemenuProps {
  activeItem:
    "Dashboard" |
    "Transactions"
  ;
}

export default function Sidemenu({ activeItem }: SidemenuProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <Icon.SquaresFour size={22} />,
      isActive: activeItem === "Dashboard",
      linkTo: "/"
    },
    {
      title: "Transações",
      icon: <Icon.ArrowsLeftRight size={22} />,
      isActive: activeItem === "Transactions",
      linkTo: "/transacoes"
    },
  ]

  const { clearAccessToken } = useContext(AuthContext);

  const history = useHistory();

  function handleLogout() {
    clearAccessToken();
    history.push("/entrar");
  }

  return (
    <aside className="bg-black w-64 flex flex-col">
      <div className="flex h-20 items-center justify-center">
        <img className="h-12" src={ngcashLogo} alt="Logo NG Cash" />
      </div>

      <ul className="flex flex-col flex-1 pt-7 pb-4 mx-4">
        <div className="flex-1">
          {menuItems.map(item => (
            <li key={item.title} 
              className={`
                ${item.isActive ? "text-white bg-gray-500" : 
                "text-gray-300 hover:bg-gray-500 hover:text-gray-100 hover:bg-opacity-25"
                } mb-8 rounded-md`
              }>
              <Link to={item.linkTo} className="flex items-center gap-5 text-base px-4 py-2 w-full">
                {item.icon} <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </div>

        <li className="bg-red-600 text-gray-100 hover:bg-red-500 hover:text-gray-200 rounded-md">
          <button
            className="flex items-center gap-5 text-base px-4 py-2 w-full"
            onClick={handleLogout}
          >
            <Icon.SignOut size={22} />
            <span>Sair</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
