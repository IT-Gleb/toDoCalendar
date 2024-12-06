"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

export default function Loader() {
  const loadRef = useRef<SVGSVGElement>(null);

  const rotateRef_1 = useRef(null);
  const rotateRef_2 = useRef(null);
  const opacityRef = useRef(null);

  useGSAP(
    () => {
      const rotate1 = gsap.timeline().play();
      rotate1
        .fromTo(
          opacityRef.current,
          { opacity: 0, strokeDasharray: 0, strokeDashoffset: 0 },
          {
            opacity: 0.7,
            strokeDashoffset: 600,
            repeat: -1,
            duration: 2.5,
            repeatDelay: 1,
            yoyo: true,
          },
          0
        )
        .fromTo(
          ["#Layer_4"],
          { rotate: 0, transformOrigin: "center center" },
          { rotate: -180, duration: 1.2, repeat: -1, ease: "linear" },
          0
        )
        .fromTo(
          rotateRef_1.current,
          { transformOrigin: "right center", rotate: 0, opacity: 0.25 },
          {
            opacity: 0.85,
            rotate: -360,
            ease: "power1.out",
            repeat: -1,
            duration: 1,
            repeatDelay: 0.5,
            yoyo: true,
          },
          0
        )
        .fromTo(
          rotateRef_2.current,
          { transformOrigin: "left center", rotate: 0 },
          {
            rotate: 360,
            ease: "power1.in",
            duration: 0.55,
            repeat: -1,
            repeatDelay: 0.25,
            yoyo: true,
          },
          0.3
        );

      return () => {
        rotate1.kill();
      };
    },
    { scope: loadRef, revertOnUpdate: true }
  );

  return (
    <svg
      ref={loadRef}
      version="1.1"
      id="Frame_0"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g id="opacity_group">
        <g id="Layer_2" ref={opacityRef}>
          <path
            id="S1"
            fill="none"
            stroke="#2f83c3"
            strokeWidth="4"
            strokeLinejoin="round"
            d="M 194.034 99.680 C 194.034 47.456 151.904 5.326 99.680 5.326 C 47.456 5.326 5.326 47.456 5.326 99.680 C 5.326 151.904 47.456 194.034 99.680 194.034 C 151.904 194.034 194.034 151.904 194.034 99.680 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#2f83c3"
            strokeWidth="4"
            strokeLinejoin="round"
            d="M 144.935 99.893 C 144.935 74.726 124.633 54.424 99.466 54.424 C 74.299 54.424 53.997 74.726 53.997 99.893 C 53.997 125.060 74.299 145.362 99.466 145.362 C 124.633 145.362 144.935 125.060 144.935 99.893 "
          />
        </g>
      </g>
      <g id="Layer_3">
        <path
          id="S1"
          fill="none"
          stroke="#85c4f4"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M 187.629 99.893 C 187.629 51.096 148.264 11.730 99.466 11.730 C 50.669 11.730 11.303 51.096 11.303 99.893 C 11.303 148.691 50.669 188.056 99.466 188.056 C 148.264 188.056 187.629 148.691 187.629 99.893 "
        />
        <path
          id="S2"
          fill="none"
          stroke="#85c4f4"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M 169.911 100.320 C 169.911 61.329 138.457 29.875 99.466 29.875 C 60.475 29.875 29.021 61.329 29.021 100.320 C 29.021 139.311 60.475 170.765 99.466 170.765 C 138.457 170.765 169.911 139.311 169.911 100.320 "
        />
        <path
          id="S3"
          fill="none"
          stroke="#85c4f4"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M 139.172 100.107 C 139.172 78.248 121.538 60.615 99.680 60.615 C 77.821 60.615 60.188 78.248 60.188 100.107 C 60.188 121.965 77.821 139.599 99.680 139.599 C 121.538 139.599 139.172 121.965 139.172 100.107 "
        />
      </g>
      <g id="rotate_group">
        <g id="Layer_1" ref={rotateRef_1}>
          <path
            id="S1"
            fill="none"
            stroke="#45a4ed"
            strokeWidth="8"
            strokeLinejoin="round"
            d="M 100.000 20.000 C 55.721 20.000 20.000 55.721 20.000 100.000 C 20.000 144.279 55.721 180.000 100.000 180.000 "
          />
        </g>
        <g id="Layer_2" ref={rotateRef_2}>
          <path
            id="S2"
            fill="none"
            stroke="#6bb0e5"
            strokeWidth="4"
            strokeLinejoin="round"
            d="M 160.000 100.000 C 160.000 66.790 133.210 40.000 100.000 40.000 M 100.000 160.000 C 133.210 160.000 160.000 133.210 160.000 100.000 "
          />
        </g>
      </g>
      <g id="Layer_4">
        <path
          id="S1"
          fill="none"
          stroke="#80b0d5"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M 120.386 104.803 C 111.997 104.803 105.230 111.570 105.230 119.959 C 105.230 123.128 106.195 126.065 107.849 128.493 C 105.318 129.192 102.650 129.566 99.893 129.566 C 97.071 129.566 94.342 129.174 91.759 128.443 C 93.391 126.024 94.343 123.106 94.343 119.959 C 94.343 111.570 87.576 104.803 79.187 104.803 C 76.212 104.803 73.441 105.654 71.104 107.126 C 70.527 104.812 70.221 102.389 70.221 99.893 C 70.221 97.132 70.596 94.460 71.297 91.926 C 73.593 93.325 76.293 94.130 79.187 94.130 C 87.576 94.130 94.343 87.362 94.343 78.973 C 94.343 76.136 93.569 73.484 92.220 71.217 C 94.666 70.567 97.238 70.221 99.893 70.221 C 102.482 70.221 104.991 70.550 107.382 71.169 C 106.015 73.446 105.230 76.116 105.230 78.973 C 105.230 87.362 111.997 94.130 120.386 94.130 C 123.356 94.130 126.123 93.281 128.458 91.813 C 129.180 94.381 129.566 97.091 129.566 99.893 C 129.566 102.432 129.249 104.894 128.653 107.244 C 126.278 105.699 123.439 104.803 120.386 104.803 "
        />
        <path
          id="S6"
          fill="none"
          stroke="#80b0d5"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M 109.072 99.680 C 109.072 94.481 104.879 90.287 99.680 90.287 C 94.481 90.287 90.287 94.481 90.287 99.680 C 90.287 104.879 94.481 109.072 99.680 109.072 C 104.879 109.072 109.072 104.879 109.072 99.680 "
        />
      </g>
    </svg>
  );
}
