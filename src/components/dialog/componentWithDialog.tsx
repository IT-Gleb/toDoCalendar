"use client";

import React, { useEffect, useRef, useState } from "react";
import { DialogComponent, type IDialog } from "./dialogComponent";
import { DiagButtonComp } from "./diagButtonComp";

export const ComponentWithDialog = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const dRef = useRef<IDialog>(null);

  const btnClick = () => {
    setIsShow((prev) => (prev = !prev));
  };

  useEffect(() => {
    if (isShow) {
      if (!dRef.current?.isOpen) {
        dRef.current?.showModal();
      }
    } else {
      if (dRef.current?.isOpen) {
        dRef.current?.hide();
      }
    }
  }, [isShow]);

  return (
    <section className=" my-10 w-[80%] mx-auto">
      {isShow && (
        <DialogComponent
          title="Всем привет"
          paramClick={() => setIsShow(false)}
          ref={dRef}
        >
          <div>Hello All!</div>
        </DialogComponent>
      )}
      <DiagButtonComp click={btnClick} />
    </section>
  );
};
