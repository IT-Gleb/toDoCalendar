"use client";

import React, { ReactElement, useState } from "react";
import { GetSVGPaths, type TSvgData } from "./svg_function";
import { motion } from "framer-motion";

export const EmptySvgComponent = ({ param }: { param: SVGSVGElement }) => {
  const [Paths] = useState<TSvgData[]>(GetSVGPaths(param));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${(param as unknown as ReactElement).props.width}`}
      height={`${(param as unknown as ReactElement).props.height}`}
      viewBox="0 0 48 48"
      version="1.1"
    >
      {Paths &&
        Paths.length > 0 &&
        Paths.map((item, index) => (
          <motion.path
            initial={{
              strokeWidth: 0,
              fillOpacity: "none",
            }}
            animate={{
              strokeWidth: [0.32, 1, 0.35],
              // strokeDashoffset: [item.length, 0],
              // strokeDasharray: [item.length, 0],
              strokeDashoffset: [item.length, 0],
              strokeDasharray: [item.length, 0],

              fill: ["rgba(0,0,0,0)", "rgba(125, 45, 98, 0.05)"],
            }}
            transition={{
              ease: "linear",
              duration: 1,
              delay: 0.25 * (index / 5),
            }}
            key={Math.random()}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.3"
            // strokeDasharray={1000}
            // strokeDashoffset={2000}
            d={item.path}
          ></motion.path>
        ))}
    </svg>
  );
};
