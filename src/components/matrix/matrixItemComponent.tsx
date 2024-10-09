"use client";
import { randomInteger } from "@/utils/functions";
import React, { useState, useRef, useEffect } from "react";

export const MatrixItemComponent = () => {
  const [Num, setNum] = useState<number>(Math.random() < 0.5 ? 1 : 0);
  const timerRef = useRef<number>(-1);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      let tmp: number = randomInteger(0, 9);
      setNum(tmp);
    }, randomInteger(1600, 3200));

    return () => {
      window.clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`w-fit ${
        Math.random() < 0.5 ? "text-green-300/60" : "text-green-300/45"
      } text-[0.9rem] font-matrix overflow-hidden`}
    >
      {Num}
    </div>
  );
};
