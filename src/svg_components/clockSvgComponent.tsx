"use client";

import React from "react";
import { motion } from "framer-motion";

const GrupVariant = {
  init: { pathLength: 0, opacity: 0.5 },
  show: {
    pathLength: 1,
    opacity: 1,

    transition: {
      duration: 1,
      delay: 8,
      delayChildren: 0.5,
      staggerChildren: 2,
      staggerDirection: -1,
      ease: "easeIn",
    },
  },
};

const ItemVariant = {
  init: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

export const ClockSvgComponent = () => {
  return (
    <svg
      version="1.1"
      id="Frame_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      fill="none"
    >
      <motion.g id="clock" variants={GrupVariant} initial="init" animate="show">
        <motion.path
          variants={ItemVariant}
          id="S1"
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 74.734 66.345 C 69.985 66.345 66.153 70.177 66.153 74.927 C 66.153 79.677 69.985 83.508 74.734 83.508 C 79.484 83.508 83.316 79.677 83.316 74.927 C 83.316 70.177 79.484 66.345 74.734 66.345 Z"
        />
        <motion.path
          variants={ItemVariant}
          id="S2"
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 138.922 75.044 C 138.922 39.217 110.020 10.315 74.193 10.315 C 38.366 10.315 9.464 39.217 9.464 75.044 C 9.464 110.871 38.366 139.773 74.193 139.773 C 110.020 139.773 138.922 110.871 138.922 75.044 M 142.049 75.044 C 142.049 37.486 111.751 7.188 74.193 7.188 C 36.635 7.188 6.337 37.486 6.337 75.044 C 6.337 112.602 36.635 142.900 74.193 142.900 C 111.751 142.900 142.049 112.602 142.049 75.044 Z"
        />
        <motion.path
          variants={ItemVariant}
          id="arrow2"
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transformOrigin: "75px 75px",
            animation: "60s linear infinite animoArrow1",
          }}
          d="M 73.987 123.585 C 73.986 123.584 67.527 110.966 67.526 110.965 C 67.527 110.966 72.317 114.382 72.317 114.382 C 72.317 114.378 72.317 75.215 72.317 75.211 C 72.318 75.211 78.572 75.046 78.572 75.046 C 78.572 75.050 75.757 114.544 75.757 114.548 C 75.757 114.548 80.959 110.809 80.959 110.808 C 80.958 110.810 73.987 123.584 73.987 123.585 Z"
        />
        <motion.path
          variants={ItemVariant}
          id="arrow1"
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transformOrigin: "75px 75px",
            //transform: "rotate(90deg)",
            animation: "5s linear infinite animoArrow1",
          }}
          d="M 73.987 12.815 C 73.986 12.817 67.527 28.966 67.526 28.968 C 67.527 28.967 72.317 24.595 72.317 24.594 C 72.317 24.599 72.317 74.725 72.317 74.730 C 72.318 74.730 78.572 74.941 78.572 74.941 C 78.572 74.935 75.757 24.387 75.757 24.382 C 75.757 24.382 80.959 29.168 80.959 29.168 C 80.958 29.167 73.987 12.817 73.987 12.815 Z"
        />
      </motion.g>
    </svg>
  );
};
