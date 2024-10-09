"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { randomInteger } from "@/utils/functions";
import { div } from "framer-motion/client";

const colors: string[] = [
  "green",
  "black",
  "maroon",
  "blue",
  "purple",
  "darkgrey",
  "yellow",
  "brown",
];

export const GraphSvgComponent = () => {
  const svgContainer = useRef(null);

  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const bar3 = useRef(null);
  const bar4 = useRef(null);
  const bar5 = useRef(null);
  const arrowRef = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      gsap.set(svgContainer.current, { opacity: 0 });

      const tl1 = gsap.timeline({
        defaults: {
          duration: 1,
          repeat: -1,
          repeatDelay: 1.2,
          ease: "power2.inOut",
          stagger: { each: 0.2 },
          yoyo: true,
        },
        //paused: true,
      });

      gsap.fromTo(
        [svgContainer.current],
        { opacity: 0, x: -500 },
        { opacity: 1, x: 0, duration: 0.75 }
      );

      tl1
        .fromTo(
          [
            bar1.current,
            bar2.current,
            bar3.current,
            bar4.current,
            bar5.current,
          ],
          {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "center bottom",
            fill: "black",
          },
          {
            opacity: 1,
            scaleY: 1,
          }
        )
        .fromTo(
          arrowRef.current,
          { opacity: 0, strokeDashoffset: 480, strokeDasharray: 480 },
          { opacity: 1, strokeDashoffset: 0, duration: 1.8 },
          "<"
          //"<" //Insert at the start previos animation
        )
        .fromTo(
          ["#bar-1", "#bar-2", "#bar-3", "#bar-4", "#bar-5"],
          { fill: colors[randomInteger(0, colors.length - 1)] },
          { fill: colors[randomInteger(0, colors.length - 1)] },
          0
        );
    },
    { scope: svgContainer }
  );

  return (
    <svg
      ref={svgContainer}
      version="1.1"
      id="Frame_0"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 320 180"
      fill="none"
    >
      <g id="bg_group">
        <g id="bg">
          {/* <path
            id="S8"
            fill="#ececec"
            fillRule="evenodd"
            stroke="none"
            d="M 1.402 16.321 C 1.404 16.321 11.968 17.281 11.969 17.281 C 11.969 17.298 12.161 178.072 12.161 178.088 C 12.160 178.088 1.980 178.088 1.979 178.088 C 1.979 178.072 1.403 16.337 1.402 16.321 Z"
          /> */}
          <path
            id="S3"
            fill="#92aad6"
            fillRule="evenodd"
            stroke="none"
            d="M 1.701 1.691 C 1.733 1.691 319.123 1.691 319.154 1.691 C 319.154 1.693 319.731 19.554 319.731 19.555 C 319.699 19.555 1.541 18.787 1.509 18.787 C 1.509 18.785 1.701 1.693 1.701 1.691 Z"
          />
          <path
            fill="#000000"
            d="M -0.270 18.882 C -0.270 18.881 -0.300 0.567 -0.300 0.565 L 0.700 0.565 C 0.700 0.567 0.670 18.881 0.670 18.882 L -0.270 18.882 Z"
          />
          <path
            fill="#000000"
            d="M 0.200 0.065 C 0.232 0.065 319.873 0.065 319.905 0.065 L 319.905 1.065 C 319.873 1.065 0.232 1.065 0.200 1.065 L 0.200 0.065 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 0.200 0.065 L 0.200 1.065 "
          />
          <path
            fill="#000000"
            d="M 320.405 0.565 C 320.405 0.561 320.562 12.912 320.597 19.473 L 319.597 19.478 C 319.562 12.922 319.405 0.573 319.405 0.565 L 320.405 0.565 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 320.405 0.565 L 319.405 0.565 "
          />
          <path
            fill="#000000"
            d="M 320.597 19.473 C 320.884 72.742 320.405 179.916 320.405 179.930 L 319.405 179.930 C 319.405 179.912 319.883 72.740 319.597 19.478 L 320.597 19.473 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 320.597 19.473 L 319.597 19.478 "
          />
          <path
            fill="#000000"
            d="M 319.905 180.430 C 319.873 180.430 0.232 180.430 0.200 180.430 L 0.200 179.430 C 0.232 179.430 319.873 179.430 319.905 179.430 L 319.905 180.430 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 319.905 180.430 L 319.905 179.430 "
          />
          <path
            fill="#000000"
            d="M -0.300 179.930 C -0.300 179.914 -0.270 18.898 -0.270 18.882 L 0.670 18.882 C 0.670 18.898 0.700 179.914 0.700 179.930 L -0.300 179.930 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M -0.300 179.930 L 0.700 179.930 "
          />
          <path
            fill="#000000"
            d="M 322.097 19.465 C 322.383 72.743 321.905 179.923 321.905 179.930 L 317.905 179.930 C 317.905 179.905 318.384 72.739 318.097 19.486 L 322.097 19.465 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 322.097 19.465 L 318.097 19.486 "
          />
          <path
            fill="#000000"
            d="M 319.905 181.930 C 319.873 181.930 0.232 181.930 0.200 181.930 L 0.200 177.930 C 0.232 177.930 319.873 177.930 319.905 177.930 L 319.905 181.930 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 319.905 181.930 L 319.905 177.930 "
          />
          <path
            fill="#000000"
            d="M -1.800 179.930 C -1.800 179.914 -1.680 18.898 -1.680 18.882 L 2.080 18.882 C 2.080 18.898 2.200 179.914 2.200 179.930 L -1.800 179.930 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M -1.800 179.930 L 2.200 179.930 "
          />
          <path
            fill="#000000"
            d="M -1.680 18.882 C -1.680 18.881 -1.800 0.567 -1.800 0.565 L 2.200 0.565 C 2.200 0.567 2.080 18.881 2.080 18.882 L -1.680 18.882 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M -1.680 18.882 L 2.080 18.882 "
          />
          <path
            fill="#000000"
            d="M 0.200 -1.435 C 0.232 -1.435 319.873 -1.435 319.905 -1.435 L 319.905 2.565 C 319.873 2.565 0.232 2.565 0.200 2.565 L 0.200 -1.435 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 0.200 -1.435 L 0.200 2.565 "
          />
          <path
            fill="#000000"
            d="M 321.905 0.565 C 321.905 0.542 322.062 12.897 322.097 19.465 L 318.097 19.486 C 318.062 12.937 317.905 0.592 317.905 0.565 L 321.905 0.565 Z"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 321.905 0.565 L 317.905 0.565 "
          />
          <path
            id="S4"
            fill="#e7efff"
            fillRule="evenodd"
            stroke="none"
            d="M 304.885 7.023 C 304.886 7.023 312.676 7.023 312.676 7.023 C 312.676 7.024 312.676 14.186 312.676 14.186 C 312.676 14.186 304.886 14.186 304.885 14.186 C 304.885 14.186 304.885 7.024 304.885 7.023 Z"
          />
          <path
            id="S4_2"
            fill="#e7efff"
            fillRule="evenodd"
            stroke="none"
            d="M 294.706 7.023 C 294.707 7.023 302.497 7.023 302.497 7.023 C 302.497 7.024 302.497 14.186 302.497 14.186 C 302.497 14.186 294.707 14.186 294.706 14.186 C 294.706 14.186 294.706 7.024 294.706 7.023 Z"
          />
          <path
            id="S4_2_2"
            fill="#e7efff"
            fillRule="evenodd"
            stroke="none"
            d="M 283.270 7.023 C 283.271 7.023 291.061 7.023 291.062 7.023 C 291.062 7.024 291.062 14.186 291.062 14.186 C 291.061 14.186 283.271 14.186 283.270 14.186 C 283.270 14.186 283.270 7.024 283.270 7.023 Z"
          />
          <path
            id="S7"
            fill="#e7efff"
            fillRule="evenodd"
            stroke="none"
            d="M 4.289 5.892 C 4.291 5.892 20.624 5.892 20.626 5.892 C 20.626 5.893 20.626 13.683 20.626 13.684 C 20.624 13.684 4.291 13.684 4.289 13.684 C 4.289 13.683 4.289 5.893 4.289 5.892 Z"
          />
        </g>
      </g>
      <g id="barGroup">
        <g id="bar1" ref={bar1}>
          <path
            id="bar-1"
            fill="#e00052"
            fillRule="evenodd"
            stroke="none"
            d="M 41.140 98.888 C 41.142 98.888 61.138 98.888 61.139 98.888 C 61.139 98.895 61.139 168.237 61.139 168.244 C 61.138 168.244 41.142 168.244 41.140 168.244 C 41.140 168.237 41.140 98.895 41.140 98.888 Z"
          />
        </g>
        <g id="bar2" ref={bar2}>
          <path
            id="bar-2"
            fill="#e00052"
            fillRule="evenodd"
            stroke="none"
            d="M 80.000 108.405 C 80.002 108.405 99.998 108.405 100.000 108.405 C 100.000 108.411 100.000 168.399 100.000 168.405 C 99.998 168.405 80.002 168.405 80.000 168.405 C 80.000 168.399 80.000 108.411 80.000 108.405 Z"
          />
        </g>
        <g id="bar3" ref={bar3}>
          <path
            id="bar-3"
            fill="#e00052"
            fillRule="evenodd"
            stroke="none"
            d="M 120.456 68.405 C 120.458 68.405 140.454 68.405 140.456 68.405 C 140.456 68.415 140.456 168.395 140.456 168.405 C 140.454 168.405 120.458 168.405 120.456 168.405 C 120.456 168.395 120.456 68.415 120.456 68.405 Z"
          />
        </g>
        <g id="bar4" ref={bar4}>
          <path
            id="bar-4"
            fill="#e00052"
            fillRule="evenodd"
            stroke="none"
            d="M 160.456 88.405 C 160.458 88.405 180.454 88.405 180.456 88.405 C 180.456 88.413 180.456 168.397 180.456 168.405 C 180.454 168.405 160.458 168.405 160.456 168.405 C 160.456 168.397 160.456 88.413 160.456 88.405 Z"
          />
        </g>
        <g id="bar5" ref={bar5}>
          <path
            id="bar-5"
            fill="#e00052"
            fillRule="evenodd"
            stroke="none"
            d="M 200.000 108.405 C 200.002 108.405 219.998 108.405 220.000 108.405 C 220.000 108.411 220.000 168.399 220.000 168.405 C 219.998 168.405 200.002 168.405 200.000 168.405 C 200.000 168.399 200.000 108.411 200.000 108.405 Z"
          />
        </g>
      </g>
      {/* <g id="border"> */}
      {/* <path
          id="S1"
          fill="#ececec"
          fillRule="evenodd"
          stroke="none"
          d="M 2.708 168.448 C 2.739 168.448 317.400 169.167 317.431 169.167 C 317.431 169.168 317.431 178.289 317.431 178.290 C 317.400 178.290 2.919 178.110 2.888 178.110 C 2.888 178.109 2.708 168.449 2.708 168.448 Z"
        /> */}
      {/* </g> */}
      <g id="arrowGroup">
        <g id="strela" ref={arrowRef}>
          <path
            id="S1"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
            d="M 19.213 108.163 C 32.753 90.711 59.832 55.805 59.832 55.805 C 59.835 55.809 90.017 96.984 90.017 96.984 C 90.021 96.977 129.332 29.906 129.332 29.906 C 129.336 29.911 168.834 81.518 168.834 81.518 C 168.835 81.517 186.908 67.917 186.908 67.917 C 186.910 67.920 208.149 99.592 208.149 99.592 C 208.151 99.590 231.999 75.370 231.999 75.370 C 232.002 75.375 264.420 124.933 264.420 124.933 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
            d="M 19.213 108.163 C 32.753 90.711 59.832 55.805 59.832 55.805 C 59.835 55.809 90.017 96.984 90.017 96.984 C 90.021 96.977 129.332 29.906 129.332 29.906 C 129.336 29.911 168.834 81.518 168.834 81.518 C 168.835 81.517 186.908 67.917 186.908 67.917 C 186.910 67.920 208.149 99.592 208.149 99.592 C 208.151 99.590 231.999 75.370 231.999 75.370 C 232.002 75.375 264.420 124.933 264.420 124.933 C 264.420 124.932 269.059 121.171 269.059 121.171 C 269.059 121.172 271.304 135.604 271.304 135.604 C 271.303 135.604 258.969 128.909 258.969 128.909 C 258.969 128.909 264.420 124.933 264.420 124.933 "
          />
        </g>
      </g>
      <g id="lefter">
        <path
          id="S1"
          fill="none"
          stroke="#000000"
          strokeWidth="10"
          strokeLinejoin="round"
          d="M 239.853 33.503 C 262.319 33.503 307.248 33.503 307.251 33.503 "
        />
        <path
          id="S1_2"
          fill="none"
          stroke="#000000"
          strokeWidth="8"
          strokeLinejoin="round"
          d="M 254.707 46.955 C 272.222 46.955 307.249 46.955 307.251 46.955 "
        />
        <path
          id="S1_2_2"
          fill="none"
          stroke="#000000"
          strokeWidth="6"
          strokeLinejoin="round"
          d="M 269.281 58.446 C 281.937 58.446 307.249 58.446 307.251 58.446 "
        />
      </g>
      <g id="lines">
        <path
          id="S8"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 11.633 30.858 C 11.718 76.575 11.890 168.008 11.890 168.008 C 11.915 168.009 264.081 168.522 264.081 168.522 "
        />
        <path
          id="S9"
          fill="#000000"
          fillRule="evenodd"
          stroke="none"
          d="M 11.590 28.762 C 11.590 28.762 6.774 37.965 6.774 37.966 C 6.775 37.966 16.405 37.966 16.406 37.966 C 16.406 37.965 11.590 28.762 11.590 28.762 Z"
        />
        <path
          id="S9_2"
          fill="#000000"
          fillRule="evenodd"
          stroke="none"
          d="M 268.752 168.577 C 268.751 168.577 259.495 163.865 259.494 163.864 C 259.494 163.865 259.602 173.495 259.602 173.496 C 259.603 173.496 268.751 168.578 268.752 168.577 Z"
        />
      </g>
    </svg>
  );
};
