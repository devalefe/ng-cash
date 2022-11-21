import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col m-auto p-8 items-center gap-8">
      <h1 className="text-4xl font-bold">Oops! 404</h1>
      <p className="text-gray-500 text-lg">Não foi possível carregar a página.</p>
      <Link to="/">
        <span className=" bg-black text-gray-100 px-5 py-2 text-base rounded-md">
          Voltar para página inicial
        </span>
      </Link>
    </div>
  );
}
