"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { DialogComponent, IDialog } from "../dialog/dialogComponent";
import AuthNickNameComponent from "../authComponents/authNickNameComponent";
import AuthPasswordComponent from "../authComponents/authPasswordComponent";
import EmailInputComponent from "../authComponents/emailInputComponent";
import Link from "next/link";
import { useFormState } from "react-dom";
import { checkUser } from "@/server/actions";
import { useRouter } from "next/navigation";
import { UKEY } from "@/utils/data";
import { useSession } from "next-auth/react";

const initFormState: TFormStateAndStatus = {
  status: "init",
  message: "Введите данные. Если вы зарегистрированы в системе.",
};

const CheckFormContent = ({
  paramCloseClick,
}: {
  paramCloseClick: () => void;
}) => {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [state, formAction, isPending] = useFormState(checkUser, initFormState);

  const nickRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const timerRef = useRef<number>(-1);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      if (
        nickRef.current &&
        emailRef.current &&
        passRef.current &&
        nickRef.current.value.trim().length > 3 &&
        emailRef.current.value.trim().length > 7 &&
        passRef.current.value.trim().length > 7
      ) {
        if (!isOk) {
          setIsOk(true);
        }
      } else {
        if (isOk) {
          setIsOk(false);
          //console.log("clear");
        }
      }
    }, 800);
    return () => {
      window.clearInterval(timerRef.current);
      //console.log("clear");
    };
  }, []);

  return (
    <section className="w-[320px] md:w-[80%] lg:w-[70%] xl:w-[65%] absolute top-[55%] translate-y-[50%] left-[50%] translate-x-[-50%] overflow-hidden bg-slate-100 text-black rounded-lg border-[3px] border-slate-700">
      <div className="bg-slate-300 text-black p-2 flex gap-x-4 items-center justify-between border-b-2 border-b-slate-400">
        <span className="uppercase">Авторизация</span>
        <button
          tabIndex={-1}
          title="Закрыть"
          className="rounded-sm w-[20px] h-[18px] text-[0.7rem] bg-rose-500 text-white active:scale-90"
          onClick={paramCloseClick}
        >
          x
        </button>
      </div>
      <form
        ref={formRef}
        action={async () => {
          //setIsOk(false);
          initFormState.status = "init";
          initFormState.message = "";
          await formAction(new FormData(formRef.current as HTMLFormElement));
        }}
        className="p-4 flex flex-col gap-y-3 justify-center bg-[url('../../assets/images/svg/back02.svg')] bg-center bg-no-repeat bg-cover"
      >
        <AuthNickNameComponent ref={nickRef} />
        <EmailInputComponent ref={emailRef} />
        <div className="flex items-center justify-between gap-x-4">
          <span className="w-[50%] md:w-[75%]">
            <AuthPasswordComponent paramNameId={UKEY} ref={passRef} />
          </span>
          {isOk && (
            <span className="w-[50%] md:w-[25%]">
              <button
                type="submit"
                title="Отправить"
                disabled={isPending}
                className="w-[110px] h-[42px] text-center p-2 rounded-xl animate-dialog-open bg-slate-500 text-white active:scale-90 hover:border hover:border-slate-800 disabled:bg-transparent"
              >
                OK
              </button>
            </span>
          )}
        </div>
      </form>
      <div className="flex items-center justify-between gap-x-3 p-4">
        <span
          className={`text-white p-1 text-[0.65rem] sm:text-[0.85rem] min-w-[50%] rounded-lg 
              ${
                state.status === "success"
                  ? "bg-green-600"
                  : state.status === "error"
                  ? "bg-red-600"
                  : "bg-slate-500"
              }`}
        >
          {state.message}
        </span>
        <span className="text-sky-600 underline underline-offset-2 text-[0.6rem] sm:text-[0.8rem]">
          <Link href={"/enter"} title="Зарегистрироваться в системе">
            Я-новый пользователь
          </Link>
        </span>
      </div>
      <div className="min-h-[2vh] bg-slate-200 text-black p-1 text-center">
        &copy;
      </div>
    </section>
  );
};

export const CheckDialog = () => {
  //Авторизация
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="mt-5 w-fit mx-auto uppercase">Загрузка...</div>;
  }

  useLayoutEffect(() => {
    if (status === "authenticated") {
      router.replace("/member");
    }
  }, [status]);

  //--------------

  const checkRef = useRef<IDialog>(null);
  const [showDialog, setShowDialog] = useState<boolean>(
    status === "unauthenticated"
  );

  const handleCloseClick = () => {
    setShowDialog(false);
    //console.log(checkRef.current?.isOpen);
    //Закрыть диалог
    if (checkRef.current?.isOpen) {
      checkRef.current?.hide();
    }
  };

  useEffect(() => {
    if (showDialog) {
      if (!checkRef.current?.isOpen) {
        checkRef.current?.show();
      }
    } else {
      if (checkRef.current?.isOpen) {
        checkRef.current?.hide();
      }
    }
  }, [showDialog]);

  if (!showDialog) {
    return null;
  }

  return (
    <DialogComponent paramClick={handleCloseClick} ref={checkRef}>
      <CheckFormContent paramCloseClick={handleCloseClick} />
    </DialogComponent>
  );
};
