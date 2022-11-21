import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  const { accountData } = useContext(AuthContext)
  
  return (
    <nav className="bg-white flex flex-shrink-0 h-20 w-full px-7 items-center justify-between shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>
      <span className="text-sm ml-4">Olá, <strong>@{accountData?.username}</strong></span>
    </nav>
  );
}