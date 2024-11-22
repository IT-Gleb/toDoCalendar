"use client";

import { useEffect, useRef, useState } from "react";
import { DialogComponent, IDialog } from "../dialog/dialogComponent";
import AuthNickNameComponent from "../authComponents/authNickNameComponent";
import AuthPasswordComponent from "../authComponents/authPasswordComponent";
import EmailInputComponent from "../authComponents/emailInputComponent";
import Link from "next/link";

const CheckFormContent = ({
  paramCloseClick,
}: {
  paramCloseClick: () => void;
}) => {
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
      <article className="p-4 indent-4 flex flex-col gap-y-4 justify-center">
        <AuthNickNameComponent />
        <EmailInputComponent />
        <AuthPasswordComponent paramNameId="u-key" />
        <span className=" self-end text-sky-600 underline underline-offset-2 text-[0.8rem]">
          <Link href={"/enter"} title="Зарегистрироваться в системе">
            Я новый пользователь
          </Link>
        </span>
      </article>
      <div className="min-h-[2vh] bg-slate-200 text-black p-1 text-center">
        &copy;
      </div>
    </section>
  );
};

export const CheckDialog = () => {
  const checkRef = useRef<IDialog>(null);
  const [showDialog, setShowDialog] = useState<boolean>(true);

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
