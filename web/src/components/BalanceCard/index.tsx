import { ReactNode } from "react";

interface BalanceCardProps {
  cardBg: string;
  icon: ReactNode;
  iconBg: string;
  title: string;
  valueColor: string;
  value: number | undefined;
}

export default function BalanceCard({ 
  cardBg, icon, iconBg, valueColor, title, value=0
}: BalanceCardProps) {
  return (
    <div className={`${cardBg} py-4 px-5 rounded-md flex flex-col flex-1 gap-3 shadow-md`}>
      <div className={`${iconBg} ${valueColor} w-14 h-14 flex items-center justify-center rounded-full`}>
        {icon}
      </div>
      <span className="text-gray-300 text-sm">{title}</span>
      <span className={`${valueColor} text-base`}>
        <strong className="text-2xl">
          {value.toLocaleString(
            "pt-BR", { style: "currency", currency: "BRL" }
          )}
        </strong>
      </span>
    </div>
  );
}
