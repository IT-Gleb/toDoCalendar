import { AddUser } from "@/server/addUser";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import AuthPasswordComponent from "./authPasswordComponent";
import AuthNickNameComponent from "./authNickNameComponent";
import EmailInputComponent from "./emailInputComponent";
import { useRouter } from "next/navigation";
import { Base_URL } from "@/utils/functions";

import { signUser } from "@/app/api/actions";

interface AuthFormContentProps {
  paramClick(): void;
}

let InitState: string = "";

const AuthFormContent: React.FunctionComponent<AuthFormContentProps> = ({
  paramClick,
}: {
  paramClick(): void;
}) => {
  //const [state, actionForm] = useFormState(AddUser, InitState);
  const [state, actionForm] = useFormState(signUser, InitState);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    //console.log(state);
    let isSubscribed: boolean = true;

    async function onSuccess() {
      if (state.includes("success")) {
        formRef.current?.reset();
        //console.log("Перенаправление!!!");
        router.push("/");
        //paramClick();
      }
    }
    if (isSubscribed) {
      onSuccess();
    }
    return () => {
      isSubscribed = false;
    };
  }, [state]);

  return (
    <section
      className="min-w-[320px] overflow-hidden bg-gradient-to-b from-[-20%] from-slate-300 via-white to-slate-600 to-[150%] relative
    border-t-2 border-t-slate-100 border-l-2 border-l-slate-100 border-r-2 border-r-slate-400 border-b-2 border-b-slate-400
    rounded-xl shadow-md shadow-slate-600"
    >
      <div className="w-full bg-slate-600 text-white flex items-center justify-between p-2 relative z-[2]">
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

      <div className="hidden sm:block object-cover object-center mt-2 text-[0.6rem] w-fit absolute z-0 -right-[30%] sm:-right-[18%] top-10 -scale-x-[1] scale-y-[1.2]">
        <picture>
          <source srcSet={"/images/svg/icon1.svg"} />
          <img src={"/images/svg/icon1.svg"} alt="Ввод данных" />
        </picture>
      </div>
      <form ref={formRef} className="relative mt-4 z-[2]" action={actionForm}>
        <fieldset className="flex flex-col space-y-2 p-4">
          <AuthNickNameComponent />
          <EmailInputComponent />
          <AuthPasswordComponent />
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
        <section className="w-full bg-slate-600 text-white p-2 flex space-x-2 items-center justify-center">
          <button
            type="button"
            className="w-[100px] h-[36px] rounded-xl transition-all border border-slate-300 bg-slate-400 text-[0.8rem] p-1 active:scale-90 hover:border-yellow-200 hover:bg-sky-800 hover:text-yellow-200"
            onClick={() => paramClick()}
          >
            Отменить
          </button>
          <button
            type="submit"
            className="w-[100px] h-[36px] rounded-xl border border-slate-300 bg-slate-400 text-[0.8rem] p-1 active:scale-90 hover:border-yellow-200 hover:bg-green-600 hover:text-yellow-200"
          >
            Добавить
          </button>
        </section>
      </form>
    </section>
  );
};

export default AuthFormContent;
