import * as Icon from "phosphor-react";

interface ErrorMessageProps {
  message: string | null;
  clearMessage: () => void;
}

export default function ErrorMessage({ message, clearMessage }: ErrorMessageProps) {
  if(!message) return <></>;
  
  return (
    <div className="bg-red-300 text-red-900 flex gap-3 w-full mb-6 rounded-md items-center px-3">
      <Icon.Info size={22} />
      <span className="text-sm py-2">{message}</span>
      <button className="ml-auto" onClick={clearMessage}>
        <Icon.X size={22} />
      </button>
    </div>
  );
}

export function parseErrorMessage(data: any) {
  try {
    const messageList = JSON.parse(data);
    return messageList[0].message;
  } catch (error: any) {
    return data;
  }
}
