// "use client";

import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { motion, useAnimate } from "framer-motion";

const t_duration: number = 0.35;

export interface IDialog {
  get isOpen(): boolean;

  showModal(): void;
  hide(): void;
  show(): void;
}

export type TDialogProps = PropsWithChildren<{
  title?: string;
  paramClick?: () => void;
  //footer?: ReactNode;
}>;

export const DialogComponent = forwardRef<IDialog, TDialogProps>(
  function Dialog({ title, paramClick, children }, ref) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [aRef, animate] = useAnimate();
    const TimerRef = useRef<number>();

    useImperativeHandle(
      ref,
      () => {
        return {
          get isOpen() {
            //console.log(dialogRef?.current?.getAttribute("open"));
            let result: boolean = false;
            result = dialogRef?.current?.getAttribute("open") !== null;
            return result;
          },
          show() {
            dialogRef?.current?.show();
            //dialogRef?.current?.show();
          },
          showModal() {
            dialogRef?.current?.showModal();
            //dialogRef?.current?.show();
          },
          hide() {
            animate(
              aRef.current,
              { scaleX: 0, opacity: 0 },
              { duration: t_duration, ease: "easeIn" }
            );
            setTimeout(() => {
              dialogRef?.current?.close();
            }, t_duration * 1000);
          },
        } as IDialog;
      },
      []
    );

    const handleCloseClick = () => {
      animate(
        aRef.current,
        { scaleX: 0, opacity: 0 },
        { duration: t_duration, ease: "easeOut" }
      );
      TimerRef.current = window.setTimeout(() => {
        if (dialogRef?.current?.getAttribute("open") !== null) {
          if (paramClick) {
            paramClick();
          }
          window.clearTimeout(TimerRef.current);
        }

        //   //dialogRef.current?.close();
      }, t_duration * 1000);
    };

    return (
      <dialog
        ref={dialogRef}
        className=" overflow-visible bg-transparent p-0 outline-none"
        aria-labelledby="titleId"
        onCancel={() => {
          if (paramClick) {
            paramClick();
          }
        }}
      >
        <motion.article
          ref={aRef}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: t_duration, ease: "easeIn" }}
          className="w-[320px] md:w-[480px] xl:w-[640px] md:min-h-[20vh] mx-auto border-solid border-4 border-white rounded-2xl flex flex-col bg-white shadow-md shadow-slate-400 overflow-hidden"
        >
          <header
            id="titleId"
            className="bg-sky-600 text-white p-2 flex items-center justify-between uppercase"
          >
            {title}
            <button
              type="button"
              title="Закрыть"
              className="w-[24px] h-[24px] text-center border border-slate-100 bg-rose-400 text-white text-[0.75rem] px-1 py-[2px]   focus:border-none focus:outline-none active:scale-90"
              onClick={handleCloseClick}
            >
              x
            </button>
          </header>
          <section className="flex-auto p-2 bg-sky-50">{children}</section>
          <footer className="bg-sky-500 text-[0.7rem] text-center text-white p-1">
            programming by Gleb Torgashin &copy;
          </footer>
        </motion.article>
      </dialog>
    );
  }
);
