"use client";

import React from "react";
import { motion } from "framer-motion";

const GroupVariants = {
  init: { pathLength: 0, opacity: 0 },
  show: {
    opacity: [0.1, 1],
    pathLength: 1,
    transition: {
      duration: 1.2,
      delay: 1,
      //when: "beforeChildren",
      delayChildren: 1.25,
      staggerChildren: 0.5,
      easy: "linear",
    },
  },
};

const ItemVariants = {
  init: { pathLength: 0, opacity: 0 },
  show: { opacity: [0.1, 1], pathLength: 1 },
};

const rotateItem = {
  init: {
    opacity: 0.8,
    pathLength: 0,
    rotate: 0,
  },
  show: {
    opacity: 1,
    pathLength: 1,
    rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
    x: [0, 22, 30, 20, 0, -20, -30, -22, 0],
    y: [0, 10, 30, 48, 50, 48, 30, 10, 0],
    transition: { duration: 10, repeat: Infinity, ease: "linear" },
    // transition: {
    //   duration: 10,
    //   //delay: 2,
    //   ease: "linear",
    //   repeat: Infinity,
    //   repeatType: "loop",
    // },
  },
};

export const BgSvgWithClockComponent = () => {
  return (
    <svg
      version="1.1"
      id="Frame_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 426 240"
    >
      <g id="world">
        <clipPath id="117d7e93-608b-4a8e-8f1e-8440dc110f28">
          <path
            id="S1"
            fill="#93d3f5"
            fillRule="evenodd"
            stroke="none"
            d="M 48.000 76.000 C 69.891 27.389 159.687 10.000 213.000 10.000 C 266.313 10.000 359.794 25.892 378.000 76.000 C 395.675 124.647 297.313 228.477 297.305 228.492 C 297.285 228.492 99.870 229.246 99.850 229.246 C 99.845 229.231 28.071 120.254 48.000 76.000 Z"
          />
        </clipPath>
        <path
          id="S1"
          fill="#93d3f5"
          fillRule="evenodd"
          stroke="none"
          d="M 48.000 76.000 C 69.891 27.389 159.687 10.000 213.000 10.000 C 266.313 10.000 359.794 25.892 378.000 76.000 C 395.675 124.647 297.313 228.477 297.305 228.492 C 297.285 228.492 99.870 229.246 99.850 229.246 C 99.845 229.231 28.071 120.254 48.000 76.000 Z"
        />
        <path
          id="S2"
          fill="none"
          stroke="#10a637"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 96.366 151.071 C 96.363 151.070 77.657 144.033 73.311 137.238 C 69.598 131.432 66.674 120.176 70.493 114.440 C 73.322 110.192 83.812 113.314 86.631 109.060 C 88.798 105.791 85.014 99.759 86.119 95.996 C 88.893 86.553 96.803 71.174 106.612 70.379 C 112.205 69.926 116.301 79.965 121.726 81.394 C 125.756 82.456 132.171 77.687 135.559 80.114 C 139.394 82.861 135.444 92.260 138.889 95.483 C 142.738 99.085 153.060 93.637 156.308 97.789 C 160.933 103.701 150.471 114.975 151.697 122.381 C 152.432 126.823 159.769 131.349 158.614 135.701 C 155.837 146.157 125.315 149.533 125.312 149.534 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#a74905"
          d="M 116.455 111.525 C 116.449 111.583 115.029 130.291 114.872 138.137 L 109.511 138.025 C 109.692 129.768 113.170 111.153 113.164 111.206 L 116.455 111.525 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#a74905"
          d="M 114.872 138.137 C 114.664 146.533 118.569 158.339 117.454 167.861 L 110.283 166.958 C 111.371 158.992 109.349 147.250 109.511 138.025 L 114.872 138.137 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#a74905"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 114.872 138.137 L 109.511 138.025 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#a74905"
          d="M 117.454 167.861 C 116.239 176.647 111.439 186.671 110.530 193.537 L 101.247 192.138 C 102.720 183.192 109.500 174.036 110.283 166.958 L 117.454 167.861 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#a74905"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 117.454 167.861 L 110.283 166.958 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#a74905"
          d="M 110.530 193.537 C 108.933 203.710 113.528 229.120 113.553 229.625 L 99.367 229.831 C 99.392 230.329 99.547 203.855 101.247 192.138 L 110.530 193.537 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#a74905"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 110.530 193.537 L 101.247 192.138 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          id="S4"
          fill="none"
          stroke="#a74905"
          strokeWidth="1"
          strokeLinejoin="round"
          d="M 120.459 136.248 C 121.103 132.647 121.748 129.046 122.392 125.445 M 126.963 131.869 C 129.804 133.269 132.645 134.669 135.487 136.069 M 112.509 139.775 C 112.510 139.775 118.177 137.512 120.459 136.248 C 122.517 135.108 124.901 133.000 126.963 131.869 C 131.506 129.375 142.897 125.199 142.899 125.198 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          id="S5"
          fill="none"
          stroke="#a74905"
          strokeWidth="1"
          strokeLinejoin="round"
          d="M 98.179 137.057 C 96.208 137.830 94.237 138.603 92.266 139.376 M 99.939 130.990 C 98.241 130.459 96.542 129.929 94.843 129.398 M 105.398 142.990 C 105.398 142.989 100.767 134.857 99.939 130.990 C 99.599 129.399 99.785 125.569 99.785 125.569 M 90.014 133.656 C 87.341 134.707 84.668 135.759 81.996 136.810 M 86.887 132.569 C 86.822 129.824 86.756 127.078 86.690 124.333 M 112.105 150.089 C 112.105 150.088 107.541 144.988 105.398 142.990 C 103.348 141.078 100.582 138.500 98.179 137.057 C 95.903 135.692 92.495 134.595 90.014 133.656 C 89.085 133.304 87.813 132.928 86.887 132.569 C 85.358 131.975 81.873 130.387 81.872 130.386 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 247.738 43.858 C 247.740 43.857 258.058 37.801 264.405 38.715 L 263.832 42.239 C 258.780 41.298 247.740 43.857 247.738 43.858 L 247.738 43.858 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 264.405 38.715 C 271.382 40.065 274.536 47.894 280.402 49.335 L 280.182 50.205 C 273.964 48.584 269.211 42.899 263.832 42.239 L 264.405 38.715 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 264.405 38.715 L 263.832 42.239 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 280.402 49.335 C 288.203 51.355 299.044 43.309 307.791 46.588 L 305.580 51.788 C 299.837 48.904 288.372 52.236 280.182 50.205 L 280.402 49.335 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 280.402 49.335 L 280.182 50.205 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 307.791 46.588 C 314.989 50.839 309.613 58.562 314.785 60.764 L 314.409 61.579 C 308.742 58.774 309.524 52.276 305.580 51.788 L 307.791 46.588 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 307.791 46.588 L 305.580 51.788 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 314.785 60.764 C 321.978 64.160 335.365 56.349 343.997 60.038 L 342.020 64.223 C 335.908 60.945 322.085 65.050 314.409 61.579 L 314.785 60.764 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 314.785 60.764 L 314.409 61.579 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 343.997 60.038 C 353.205 64.938 352.128 80.446 352.129 80.448 L 352.129 80.448 C 352.128 80.446 349.062 67.001 342.020 64.223 L 343.997 60.038 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 343.997 60.038 L 342.020 64.223 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 210.313 30.992 C 210.311 30.993 202.271 33.162 198.660 33.151 L 198.667 31.817 C 202.102 31.840 210.311 30.993 210.313 30.992 L 210.313 30.992 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 198.660 33.151 C 191.328 33.086 181.359 30.968 175.871 32.373 L 174.447 25.178 C 182.965 23.812 191.722 31.812 198.667 31.817 L 198.660 33.151 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 198.660 33.151 L 198.667 31.817 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 175.871 32.373 C 171.273 32.837 163.694 39.070 157.139 40.264 L 156.917 38.950 C 162.857 38.032 166.614 27.173 174.447 25.178 L 175.871 32.373 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 175.871 32.373 L 174.447 25.178 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 157.139 40.264 C 148.244 41.663 135.976 35.013 129.697 36.884 L 128.211 29.267 C 138.906 27.827 148.759 40.433 156.917 38.950 L 157.139 40.264 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 157.139 40.264 L 156.917 38.950 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 129.697 36.884 C 123.657 37.488 115.092 46.593 107.092 49.049 L 106.712 47.771 C 114.161 45.638 118.433 31.749 128.211 29.267 L 129.697 36.884 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 129.697 36.884 L 128.211 29.267 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 107.092 49.049 C 100.426 50.955 90.570 48.282 85.799 50.559 L 83.787 45.476 C 91.353 42.871 100.659 49.642 106.712 47.771 L 107.092 49.049 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 107.092 49.049 L 106.712 47.771 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="#e8f7ff"
          d="M 85.799 50.559 C 79.438 52.834 66.321 66.491 66.319 66.492 L 66.319 66.492 C 66.321 66.491 75.572 48.968 83.787 45.476 L 85.799 50.559 Z"
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <path
          fill="none"
          stroke="#e8f7ff"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="round"
          d="M 85.799 50.559 L 83.787 45.476 "
          clipPath="url(#117d7e93-608b-4a8e-8f1e-8440dc110f28)"
        />
        <g id="sunny">
          <path
            id="S1"
            fill="#fdffbe"
            fillRule="evenodd"
            stroke="none"
            d="M 298.643 71.583 C 308.815 71.583 316.491 79.366 316.491 88.445 C 316.491 97.524 308.815 105.307 298.643 105.307 C 288.470 105.307 280.794 97.524 280.794 88.445 C 280.794 79.366 288.470 71.583 298.643 71.583 Z"
          />
          <path
            id="S1"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 275.264 72.885 C 259.598 62.748 243.931 52.611 228.265 42.474 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 320.756 103.548 C 333.239 111.004 345.722 118.461 358.205 125.917 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 285.569 113.601 C 278.615 127.928 271.662 142.254 264.708 156.580 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 311.959 64.843 C 316.902 56.967 321.845 49.092 326.788 41.217 "
          />
          <path
            id="S5"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 324.777 81.682 C 335.166 78.247 345.554 74.812 355.943 71.377 "
          />
          <path
            id="S6"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 286.574 52.025 C 287.747 55.711 288.920 59.397 290.093 63.083 "
          />
          <path
            id="S7"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 268.227 96.511 C 257.252 99.694 246.277 102.878 235.302 106.061 "
          />
          <path
            id="S8"
            fill="none"
            stroke="#fdffbe"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 305.173 116.869 C 306.933 123.320 308.692 129.771 310.451 136.221 "
          />
        </g>
        <motion.g
          id="clock"
          variants={GroupVariants}
          initial="init"
          animate="show"
        >
          <motion.path
            variants={ItemVariants}
            id="S1"
            fill="none"
            stroke="#074f74"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 276.521 120.387 C 276.521 85.192 248.129 56.800 212.933 56.800 C 177.738 56.800 149.346 85.192 149.346 120.387 C 149.346 155.583 177.738 183.975 212.933 183.975 C 248.129 183.975 276.521 155.583 276.521 120.387 "
          />
          <motion.path
            variants={ItemVariants}
            id="S1"
            fill="none"
            stroke="#074f74"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 213.688 121.393 C 213.939 136.158 214.190 150.924 214.442 165.689 "
          />
          <motion.path
            fill="#074f74"
            d="M 213.162 59.178 C 212.273 62.499 211.905 65.959 211.016 69.280 L 208.118 68.504 C 209.007 65.183 210.418 62.002 211.308 58.681 L 213.162 59.178 Z"
          />
          <motion.path
            fill="#074f74"
            d="M 214.009 69.351 C 212.942 66.030 211.321 59.225 211.322 59.225 L 213.148 58.635 C 213.149 58.637 215.798 65.112 216.865 68.433 L 214.009 69.351 Z"
          />
          <motion.path
            variants={ItemVariants}
            fill="none"
            stroke="#074f74"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 214.009 69.351 L 216.865 68.433 "
          />
          <motion.path
            variants={rotateItem}
            // initial="init"
            // animate="show"
            // style={{
            //   transform: "rotate(90deg)",
            //   //   transformOrigin: "50%,50%",
            // }}
            fill="#074f74"
            d="M 213.195 58.908 C 213.195 58.914 215.158 120.617 215.158 120.625 L 212.159 120.692 C 212.158 120.687 211.275 58.958 211.275 58.951 L 213.195 58.908 Z"
          />
          <motion.path
            variants={ItemVariants}
            fill="none"
            stroke="#074f74"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 213.195 58.908 L 211.275 58.951 "
          />
        </motion.g>
      </g>
    </svg>
  );
};
