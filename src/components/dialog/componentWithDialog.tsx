"use client";

import React, { useRef } from "react";
import { DialogComponent, type IDialog } from "./dialogComponent";
import { DiagButtonComp } from "./diagButtonComp";

export const ComponentWithDialog = () => {
  const dRef = useRef<IDialog>(null);

  const btnClick = () => {
    dRef.current?.isOpen ? dRef.current?.hide() : dRef.current?.show();
  };

  return (
    <section className=" my-10 w-[80%] mx-auto">
      <DialogComponent title="Всем привет" ref={dRef}>
        <div>Hello All!</div>
      </DialogComponent>
      <DiagButtonComp click={btnClick} />
    </section>
  );
};
