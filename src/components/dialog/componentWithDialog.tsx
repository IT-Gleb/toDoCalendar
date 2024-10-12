"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { DialogComponent, type IDialog } from "./dialogComponent";
import { DiagButtonComp } from "./diagButtonComp";
import { motion, useAnimate } from "framer-motion";

const t_duration: number = 0.35;

const ExampleDialogContent = memo(
  ({ paramClose }: { paramClose: () => void }) => {
    const [scope, animate] = useAnimate();

    return (
      <motion.article
        ref={scope}
        className="w-[320px] md:w-[480px] xl:w-[640px] bg-sky-50 flex flex-col space-y-2 items-start overflow-hidden 
        rounded-lg border-4 border-l-sky-50 border-t-sky-50  border-r-sky-200 border-b-sky-200 shadow-sm shadow-sky-600"
      >
        <div
          className="w-full bg-sky-400 text-sky-800 flex space-x-2 items-center justify-between p-1"
          aria-label="Заголовок"
        >
          Title
          <button
            type="button"
            aria-label="Закрыть окно"
            onClick={async () => {
              await animate(
                scope.current,
                { scaleX: [1, 0], opacity: [1, 0] },
                { duration: t_duration, ease: "easeOut" }
              );
              paramClose();
            }}
            title="Закрыть"
            className="w-[22px] h-[22px] px-1 py-[2px] bg-red-500 text-white font-bold text-[0.7rem] active:scale-90"
          >
            x
          </button>
        </div>
        <div
          className="w-full flex-auto p-1 bg-sky-50 text-[0.9rem]"
          aria-label="Основная часть"
        >
          <ul>
            <li>
              <p className="indent-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, itaque distinctio tenetur aut sapiente inventore nisi
                laborum, facilis laudantium, voluptatem cumque. Blanditiis,
                fugit numquam sed, ab ipsum iusto at autem quidem, officia ad
                placeat sequi ea similique ipsa non adipisci!
              </p>
            </li>
            <li className="mt-1">
              <p className="indent-2">
                Далеко-далеко за словесными горами в стране гласных и согласных,
                живут рыбные тексты. Собрал семантика текст снова решила злых.
                Языком, парадигматическая? Переписали ему назад оксмокс над.
              </p>
            </li>
          </ul>
        </div>
        <div className="w-full bg-sky-400 p-1 text-center text-sky-800">
          footer
        </div>
      </motion.article>
    );
  }
);

export const ComponentWithDialog = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const dRef = useRef<IDialog>(null);

  const btnClick = () => {
    setIsShow((prev) => (prev = !prev));
  };

  useEffect(() => {
    //console.log(isShow);

    if (isShow) {
      if (!dRef.current?.isOpen) {
        dRef.current?.showModal();
      }
    } else {
      //if (dRef.current?.isOpen) {
      //console.log("Закрываю!");
      dRef.current?.hide();
      //}
    }
  }, [isShow]);

  return (
    <section className=" my-10 w-[80%] mx-auto">
      {isShow && (
        <DialogComponent paramClick={btnClick} ref={dRef}>
          <ExampleDialogContent paramClose={btnClick} />
        </DialogComponent>
      )}
      <DiagButtonComp click={btnClick} />
    </section>
  );
};
