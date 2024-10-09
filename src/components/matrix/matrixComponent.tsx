"use client";

import React, { useState, useEffect } from "react";

export const MatrixComponent = ({ pWidth = 10 }: { pWidth: number }) => {
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    const tmp: number[] = [];
    let indx: number = 0;
    while (indx < pWidth) {
      tmp.push(indx);
      indx++;
    }

    setWidths(tmp);
  }, [pWidth]);

  return (
    <div className="w-full min-h-[100vh] bg-black bg-[url('../../assets/images/gif/matrix.gif')] bg-no-repeat bg-cover">
      <div className="flex items-start w-fit mx-auto"></div>
    </div>
  );
};
