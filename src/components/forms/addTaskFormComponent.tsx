"use client";

import React, { useEffect, useState } from "react";
import { AddButtonComponent } from "../buttons/addButtonComponent";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { CompareDateNow } from "@/utils/functions";

export const AddTaskFormComponent = ({
  paramDate,
  children,
}: {
  paramDate?: string;
  children: Readonly<React.ReactNode>;
}) => {
  const [animoRef, animate] = useAnimate();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isEnabledDate] = useState<boolean>(
    paramDate ? CompareDateNow(paramDate) : false
  );

  const handleShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShow((prev) => (prev = !prev));
  };

  useEffect(() => {
    if (isShow) {
      animate(animoRef.current, {
        y: [-100, 0],
        height: [0, "auto"],
        opacity: 1,
      });
    }
  }, [isShow]);

  return (
    <section className="flex flex-col gap-y-2">
      {isEnabledDate && (
        <div className="place-self-end ">
          <AddButtonComponent
            paramTitle={"Добавить задачу"}
            paramClick={handleShow}
          />
        </div>
      )}
      {/* <div className="h-auto overflow-hidden"> */}
      <AnimatePresence>
        {isShow && (
          <motion.div
            ref={animoRef}
            exit={{
              opacity: 0,
              height: 0,
              y: -50,
              transition: { ease: "linear" },
            }}
            className="w-full border border-black/20 p-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      {/* </div> */}
    </section>
  );
};
