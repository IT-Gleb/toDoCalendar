"use client";

import { useState, useRef, useEffect } from "react";
import { DialogComponent, type IDialog } from "../dialog/dialogComponent";
import AuthFormContent from "./authFormContent";
import { useAnimate, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface RegisterComponentProps {}

const RegisterUserComponent: React.FunctionComponent<
  RegisterComponentProps
> = () => {
  //Авторизован или нет
  const { status } = useSession();
  if (status === "authenticated") {
    redirect("/member");
  }
  //------------------------------
  const [isShow, setIsShow] = useState<boolean>(false);
  const timerRef = useRef<number>(-1);
  const diagRef = useRef<IDialog>(null);
  const [divRef, animate] = useAnimate();

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      //console.log("Должен показаться диалог");
      setIsShow(true);
    }, 1500);

    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = async () => {
    await animate(
      divRef.current,
      { opacity: [1, 0] },
      { duration: 0.35, ease: "linear" }
    );
    setIsShow(false);
  };

  useEffect(() => {
    if (isShow) {
      if (!diagRef.current?.isOpen) {
        diagRef.current?.show();
      }
    } else {
      if (diagRef.current?.isOpen) {
        diagRef.current?.hide();
      }
    }
  }, [isShow]);

  return (
    <section className="mt-20">
      {isShow && (
        <motion.div
          initial={{ scaleX: 1 }}
          className="w-fit mx-auto"
          ref={divRef}
        >
          <DialogComponent paramClick={handleClose} ref={diagRef}>
            <AuthFormContent paramClick={handleClose} />
          </DialogComponent>
        </motion.div>
      )}
    </section>
  );
};

export default RegisterUserComponent;
