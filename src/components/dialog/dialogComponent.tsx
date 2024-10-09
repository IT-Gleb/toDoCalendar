// "use client";

import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";

export interface IDialog {
  get isOpen(): boolean;

  show(): void;
  hide(): void;
}

export type TDialogProps = PropsWithChildren<{
  title?: string;
  //paramClick?: () => void;
  //footer?: ReactNode;
}>;

export const DialogComponent = forwardRef<IDialog, TDialogProps>(
  function Dialog({ title, children }, ref) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          get isOpen() {
            //console.log(dialogRef?.current?.getAttribute("open"));
            let result: boolean = false;
            dialogRef?.current?.getAttribute("open") === null
              ? (result = false)
              : (result = true);
            return result;
          },
          show() {
            dialogRef?.current?.showModal();
          },
          hide() {
            dialogRef?.current?.close();
          },
        } as IDialog;
      },
      []
    );

    const handleCloseClick = () => {
      if (dialogRef?.current?.getAttribute("open") !== null) {
        dialogRef.current?.close();
      }
    };

    return (
      <dialog
        ref={dialogRef}
        className="overflow-visible bg-transparent p-0 outline-none place-content-center"
        //onCancel={handleCloseClick}
      >
        <article className="w-[320px] lg:w-[480px] xl:w-[640px] lg:min-h-[20vh] mx-auto flex flex-col bg-white shadow-md">
          <header className="bg-slate-700 text-white p-2 flex items-center justify-between">
            {title}
            <button
              type="button"
              title="Закрыть"
              className="w-[24px] h-[24px] text-center border border-slate-100 bg-rose-400 text-white text-[0.75rem] px-1 py-[2px] active:border-none active:outline-none active:scale-90"
              onClick={handleCloseClick}
            >
              x
            </button>
          </header>
          <section className="flex-auto p-2">{children}</section>
          <footer className="bg-slate-600 text-[0.7rem] text-center text-white p-1">
            mgn kghbkhkglklhgkhlk glhk lgklhkgl khl
          </footer>
        </article>
      </dialog>
    );
  }
);
