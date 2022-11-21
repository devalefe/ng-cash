import * as Icon from "phosphor-react";

import { format as dateFormat } from 'date-fns';
import { ptBR } from "date-fns/locale";

import { UserDataProps } from '../../pages/Home';

export interface TransactionDataProps {
  id: string;
  value: number;
  from: string;
  to: string;
  incoming: boolean;
  createdAt: Date;
}

interface DataTableProps {
  transactions: TransactionDataProps[] | undefined;
  accountData: UserDataProps | undefined;
}

export default function TransactionsTable({ transactions, accountData }: DataTableProps) {
  if(!transactions || transactions?.length < 1) {
    return (
      <div className="h-full flex items-center gap-5 justify-center">
        <Icon.Prohibit size={36} className="text-gray-300" />
        <span className="text-2xl text-gray-300" >Não há nenhuma tranferência.</span>
      </div>
    );
  }

  return (
    <table className="w-full text-left">
      <thead className="bg-white sticky top-0">
        <tr className="text-base">
          <th className="p-3">#</th>
          <th>Usuário</th>
          <th>Data</th>
          <th className="min-w-[80px]">Valor</th>
          <th className="text-center">Tipo</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {transactions?.map((item, i) => (
          <tr className={`${((i%2) === 0) ? "bg-gray-100" : ""} hover:bg-gray-150`} key={item.id}>
            <td className="px-3 py-4 font-bold text-gray-500">
              {item.id}
            </td>
            <td className="font-bold text-gray-500">
              @{item.to === accountData?.username ? item.from : item.to}
            </td>
            <td className="text-gray-500 italic">
              {dateFormat(new Date(item.createdAt), "dd 'de' MMM 'de' yyyy 'às' HH:mm'h'", { locale: ptBR })}
            </td>
            <td className="text-gray-500">
              {item.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </td>
            <td>
              <span className={`
                ${item.incoming ? "bg-green-300" : 
                "bg-red-300"} flex m-auto items-center justify-center 
                w-16 p-1 rounded text-gray-500`
              }>
                <span className={`${item.incoming ? "text-green-900" : "text-red-900"}`}>
                  {item.incoming ? "Entrada" : "Saída"}
                </span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}