// "use client";

import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";
import { AnimationSequence, motion } from "framer-motion";
import { animate } from "framer-motion";

export interface IDialog {
  get isOpen(): boolean;

  showModal(): void;
  hide(): Promise<void>;
  show(): void;
}

export type TDialogProps = PropsWithChildren<{
  //title?: string;
  paramClick?: () => void;
  //footer?: ReactNode;
}>;

export const DialogComponent = forwardRef<IDialog, TDialogProps>(
  function Dialog({ paramClick, children }, Reference) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(
      Reference,
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
          async hide() {
            //@ts-ignore
            await animate(
              dialogRef.current as unknown as AnimationSequence,
              { opacity: [1, 0], scaleX: [1, 0] },
              { duration: 0.35, ease: "easeOut" }
            );
            dialogRef?.current?.close();
          },
        } as unknown as IDialog;
      },
      []
    );

    return (
      <motion.dialog
        ref={dialogRef}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.35, ease: "easeIn" }}
        className=" overflow-visible bg-transparent p-0 outline-none sm:w-[90%] md:w-[85%] lg:w-[70%] xl:w-[60%]"
        onCancel={async (e) => {
          e.preventDefault();
          const diag = e.currentTarget as unknown as HTMLDialogElement;
          // @ts-ignore
          await animate(
            diag,
            { scaleX: [1, 0], opacity: [1, 0] },
            { duration: 0.35, ease: "easeOut" }
          );
          if (paramClick) {
            paramClick();
          }
        }}
      >
        {children}
      </motion.dialog>
    );
  }
);
