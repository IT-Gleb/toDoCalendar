import { AddUser } from "@/server/addUser";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

interface AuthFormContentProps {
  paramClick(): void;
}

let InitState: string = "";

const AuthFormContent: React.FunctionComponent<AuthFormContentProps> = ({
  paramClick,
}: {
  paramClick(): void;
}) => {
  const [state, actionForm] = useFormState(AddUser, InitState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    //console.log(state);
    if (state.includes("success")) {
      formRef.current?.reset();
      paramClick();
    }
  }, [state]);

  return (
    <section
      className="min-w-[320px] overflow-hidden bg-sky-50
    border-t-2 border-t-sky-100 border-l-2 border-l-sky-100 border-r-2 border-r-sky-700 border-b-2 border-b-sky-700
    rounded-xl shadow-md shadow-sky-600"
    >
      <div className="w-full bg-sky-500 text-white flex items-center justify-between p-2">
        Регистрация
        <button
          className="w-[22px] h-[20px] bg-red-500 text-[0.75rem] rounded-sm active:scale-90"
          title="Закрыть"
          onClick={(e) => {
            paramClick();
          }}
        >
          x
        </button>
      </div>
      <div className="w-fit mx-auto object-cover mt-2 text-[0.6rem]">
        <picture>
          <source srcSet={"../../assets/images/gif/matrix.gif"} />
          <img src={"../../assets/images/gif/matrix.gif"} alt="Ввод данных" />
        </picture>
      </div>
      <form ref={formRef} className="mt-4" action={actionForm}>
        <fieldset className="flex flex-col space-y-2 p-4">
          <label className="flex flex-col">
            <span className="text-[0.8rem]">Ваше имя:</span>
            <input
              type="text"
              name="u-nickname"
              id="u-nickname"
              required
              autoComplete="off"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-[0.8rem]">Ваш email:</span>
            <input type="email" name="u-email" id="u-email" required />
          </label>
          <label className="flex flex-col">
            <span className="text-[0.8rem]">Пароль:</span>
            <input
              type="password"
              name="u-pass"
              id="u-pass"
              required
              minLength={8}
              maxLength={10}
              autoComplete="off"
            />
          </label>
          <div
            className={`my-2 p-2 uppercase text-white ${
              state.includes("error")
                ? "bg-red-600"
                : state.includes("success")
                ? "bg-green-600"
                : "bg-inherit"
            }`}
          >
            {state}
          </div>
        </fieldset>
        <section className="w-full bg-sky-500 text-white p-2 flex space-x-2 items-center justify-center">
          <button
            type="button"
            className="w-[100px] h-[36px] rounded-xl transition-all border border-slate-300 bg-slate-400 text-[0.8rem] p-1 active:scale-90 hover:border-yellow-200 hover:bg-sky-800 hover:text-yellow-200"
            onClick={() => paramClick()}
          >
            Отменить
          </button>
          <button
            type="submit"
            className="w-[100px] h-[36px] rounded-xl transition-all border border-slate-300 bg-slate-400 text-[0.8rem] p-1 active:scale-90 hover:border-yellow-200 hover:bg-green-600 hover:text-yellow-200"
          >
            Добавить
          </button>
        </section>
      </form>
    </section>
  );
};

export default AuthFormContent;
