"use client";

import React, { useEffect, useState } from "react";
import { MatrixItemComponent } from "./matrixItemComponent";

export const MatrixLineComponent = () => {
  const [countNum, setCountNum] = useState<number[]>([]);

  useEffect(() => {
    let tmp: number[] = [];
    for (let i: number = 0; i < 43; i++) {
      tmp.push(i);
    }
    setCountNum(tmp);
  }, []);

  return (
    <div className="flex flex-col items-start">
      {countNum.length &&
        countNum.map((item) => <MatrixItemComponent key={item} />)}
    </div>
  );
};
