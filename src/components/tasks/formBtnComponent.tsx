import { useFormStatus } from "react-dom";

export type TBtnParam = {
  text: string;
};

export const BtnAddTask: React.FC<TBtnParam> = (param) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-[80px] h-[32px] rounded-sm bg-sky-500 transition-colors hover:shadow-md hover:bg-sky-600 hover:shadow-sky-800 text-white text-[0.75rem] active:scale-90 p-2 disabled:bg-slate-50 disabled:text-slate-200"
      title={`${param.text} подзадачу`}
      disabled={pending}
    >
      {param.text}
    </button>
  );
};
