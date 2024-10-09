"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const BgSvgTasksComponent = () => {
  const mainRef = useRef<SVGSVGElement>(null);

  const lentaRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    //(context, contextSafe)
    () => {
      //Получить высоту svg
      let svg_height: number = mainRef.current?.getBBox().height as number;
      //let svg_height: number = (mainRef.current?.clientHeight as number) - 100;
      //mainRef.current?.getBBox().y as number;
      //console.log(svg_height);
      //Работа с путями установить ширину линии в половину от имеющуйся
      const paths = mainRef.current?.querySelectorAll("path");
      if (paths) {
        //console.log(paths.length);
        if (paths.length) {
          paths.forEach((item: SVGPathElement) => {
            let tmpWidth: string | null = item.getAttribute("stroke-width");
            //console.log(tmpWidth);
            if (tmpWidth && Number(tmpWidth) < 6) {
              item.setAttribute("stroke-width", String(Number(tmpWidth) * 0.6));
              item.setAttribute("stroke-opacity", "0.5");
            }
          });
        }
      }

      //Анимация ленты задач
      const lentaTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: mainRef.current,
            //pin: true,

            start: "top top",
            end: `+=${isNaN(svg_height) ? 600 : svg_height}`,
            onUpdate: (self) => {
              if (self.progress >= 0 && self.progress < 1) {
                //console.log(self.start, self.end, self.progress);
                if (lentaTl.paused()) {
                  lentaTl.resume();
                  // console.log("Animation run...");
                }
              } else {
                if (!lentaTl.paused()) {
                  lentaTl.pause();
                  // console.log("Animation Paused");
                }
              }
            },
          },
        })
        .play();

      lentaTl
        .fromTo(
          //Анимация задач снизу-вверх
          lentaRef.current,
          { y: 0 },
          {
            y: -61,
            duration: 1,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 1,
          }
        )
        .fromTo(
          //Анимация строк на ноутбуке
          [
            "#stroke-1",
            "#stroke-2",
            "#stroke-3",
            "#stroke-4",
            "#stroke-5",
            "#stroke-6",
            "#stroke-7",
            "#stroke-8",
          ],
          {
            opacity: 0.5,
            strokeDasharray: 100,
            strokeDashoffset: 100,
          },
          {
            opacity: 1,
            strokeDashoffset: 0,
            stagger: { each: 0.8 },
            duration: 1.5,
            ease: "power1.Out",
            repeat: -1,
            repeatDelay: 1,
            yoyo: true,
          }
        )
        .fromTo(
          //Анимация кругов диаграммы
          ["#diag-3"],
          { rotate: 0, transformOrigin: "center center" },
          {
            rotate: 360,
            duration: 1,
            ease: "power1.in",
            repeat: -1,
            repeatDelay: 0.35,
            yoyo: true,
          },
          "<0.65"
        )
        .fromTo(
          ["#diag-4"],
          { rotate: 0, transformOrigin: "center center" },
          {
            rotate: -360,
            duration: 2.5,
            ease: "power1.out",
            repeat: -1,
            repeatDelay: 0.4,
            yoyo: true,
          },
          0
        )
        .fromTo(
          //Анимация стрелок часов
          ["#arr2"],
          { transformOrigin: "center bottom", rotate: 0 },
          { rotate: 360, ease: "linear", repeat: -1, duration: 20 },
          0
        )
        .fromTo(
          ["#arr1"],
          { transformOrigin: "center top", rotate: 0 },
          { rotate: 360, ease: "linear", repeat: -1, duration: 60 },
          "<0.25"
        )
        .fromTo(
          //Анимация координатных линий графика
          ["#axises"],
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.75,
            ease: "power1.inOut",
          },
          0
        )
        .fromTo(
          //Анимация прямоугольников графика
          ["#bar1", "#bar2", "#bar3", "#bar4"],
          {
            transformOrigin: "center bottom",
            scaleY: 0,
            y: 1,
            scaleX: 1.5,
          },
          {
            scaleY: 1,
            duration: 1,
            opacity: 0.5,
            scaleX: 0.8,
            stagger: { each: 0.5 },
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 1,
          },
          0
        )
        .fromTo(
          //Анимация линии графика
          ["#arrow1-2"],
          {
            opacity: 0,
            strokeDasharray: 160,
            strokeDashoffset: 160,
          },
          {
            duration: 2.5,
            opacity: 1,
            strokeDashoffset: 0,
            stroke: "#000",
            strokeWidth: 2,
            //stagger: { each: 0.2 },
            repeat: -1,
            repeatDelay: 1,
            ease: "power1.inOut",
          },
          "<" //End of previos animation
        );

      return () => {
        lentaTl.scrollTrigger?.kill();
        lentaTl.kill();
      };
    },
    { dependencies: [mainRef.current], scope: mainRef, revertOnUpdate: true }
  );

  return (
    <svg
      ref={mainRef}
      version="1.1"
      id="Frame_0"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 426 240"
      fill="none"
    >
      <g id="bg">
        <g id="shesterenka">
          <path
            id="S1"
            fill="none"
            stroke="#d3d3d3"
            strokeWidth="4"
            strokeLinejoin="round"
            d="M 294.731 262.236 C 297.090 250.247 308.109 241.213 321.402 241.213 C 336.423 241.213 348.540 252.749 348.540 267.049 C 348.540 269.323 348.234 271.528 347.658 273.628 C 349.403 273.686 351.157 273.716 352.918 273.716 C 369.101 273.716 384.655 271.216 399.177 266.597 C 395.429 262.168 393.188 256.529 393.188 250.380 C 393.188 236.080 405.305 224.544 420.326 224.544 C 432.178 224.544 442.223 231.726 445.934 241.781 C 458.032 232.193 468.462 220.766 476.753 207.944 C 464.939 205.145 456.220 195.004 456.220 182.874 C 456.220 168.574 468.337 157.038 483.358 157.038 C 487.912 157.038 492.200 158.098 495.963 159.974 C 497.460 151.992 498.241 143.770 498.241 135.369 C 498.241 128.095 497.655 120.955 496.527 113.989 C 493.771 114.882 490.814 115.367 487.736 115.367 C 472.715 115.367 460.597 103.831 460.597 89.531 C 460.597 78.383 467.961 68.915 478.325 65.283 C 470.270 52.219 460.026 40.535 448.068 30.682 C 443.195 37.535 434.952 42.026 425.579 42.026 C 410.558 42.026 398.441 30.490 398.441 16.190 C 398.441 12.099 399.433 8.234 401.201 4.800 C 386.625 -0.065 370.978 -2.786 354.674 -2.968 C 355.802 -0.124 356.419 2.962 356.419 6.189 C 356.419 20.489 344.302 32.025 329.281 32.025 C 314.260 32.025 302.142 20.489 302.142 6.189 C 302.142 6.011 302.144 5.833 302.148 5.655 C 288.285 10.555 275.430 17.408 263.949 25.865 C 269.654 30.596 273.252 37.568 273.252 45.360 C 273.252 59.660 261.135 71.196 246.114 71.196 C 239.119 71.196 232.754 68.694 227.949 64.577 C 221.032 75.643 215.693 87.713 212.221 100.508 C 225.883 101.869 236.484 112.826 236.484 126.201 C 236.484 140.501 224.366 152.037 209.345 152.037 C 209.106 152.037 208.868 152.034 208.631 152.029 C 210.660 168.219 215.609 183.538 222.966 197.497 C 226.739 195.609 231.039 194.541 235.608 194.541 C 250.629 194.541 262.747 206.077 262.747 220.377 C 262.747 227.232 259.963 233.452 255.409 238.070 C 266.971 248.021 280.230 256.220 294.731 262.236 "
          />
          <path
            id="S11"
            fill="none"
            stroke="#d3d3d3"
            strokeWidth="4"
            strokeLinejoin="round"
            d="M 443.088 134.535 C 443.088 87.484 403.217 49.527 353.793 49.527 C 304.369 49.527 264.498 87.484 264.498 134.535 C 264.498 181.587 304.369 219.544 353.793 219.544 C 403.217 219.544 443.088 181.587 443.088 134.535 "
          />
          <path
            id="S12"
            fill="none"
            stroke="#d3d3d3"
            strokeWidth="4"
            strokeLinejoin="round"
            d="M 432.299 134.926 C 432.382 93.387 396.067 60.092 352.441 60.865 C 310.141 61.614 277.020 94.651 277.385 134.926 C 277.751 175.191 311.456 207.384 353.751 207.724 C 396.654 208.070 432.218 175.771 432.299 134.926 "
          />
        </g>
        <g id="shesterenka_2">
          <path
            id="S1"
            fill="none"
            stroke="#d3d3d3"
            strokeWidth="3"
            strokeLinejoin="round"
            d="M 154.058 208.193 C 151.255 198.256 141.631 191.426 130.826 192.373 C 118.617 193.443 109.619 204.029 110.675 216.082 C 110.843 217.999 111.255 219.836 111.878 221.564 C 110.464 221.738 109.041 221.888 107.609 222.014 C 94.455 223.166 81.627 222.166 69.482 219.308 C 72.202 215.308 73.606 210.396 73.152 205.213 C 72.096 193.160 61.395 184.300 49.185 185.370 C 39.552 186.214 31.917 192.982 29.644 201.721 C 19.101 194.502 9.780 185.613 2.093 175.396 C 11.490 172.196 17.828 163.027 16.932 152.803 C 15.876 140.751 5.175 131.890 -7.035 132.960 C -10.737 133.284 -14.143 134.484 -17.064 136.333 C -18.870 129.712 -20.112 122.837 -20.733 115.756 C -21.270 109.626 -21.321 103.566 -20.918 97.614 C -18.613 98.171 -16.173 98.368 -13.671 98.149 C -1.461 97.079 7.537 86.493 6.480 74.440 C 5.657 65.044 -1.028 57.588 -9.720 55.265 C -4.138 43.680 3.326 33.102 12.318 23.946 C 16.785 29.375 23.817 32.574 31.436 31.906 C 43.646 30.836 52.643 20.250 51.587 8.197 C 51.285 4.749 50.193 1.561 48.503 -1.207 C 59.991 -6.345 72.508 -9.753 85.748 -11.068 C 85.041 -8.590 84.767 -5.945 85.005 -3.225 C 86.061 8.828 96.763 17.688 108.973 16.618 C 121.182 15.548 130.180 4.962 129.124 -7.091 C 129.111 -7.242 129.096 -7.392 129.080 -7.541 C 140.710 -4.398 151.665 0.462 161.622 6.772 C 157.334 11.167 154.924 17.299 155.500 23.867 C 156.556 35.920 167.257 44.780 179.467 43.710 C 185.153 43.212 190.142 40.650 193.744 36.837 C 200.183 45.672 205.414 55.465 209.181 66.002 C 198.177 68.122 190.369 78.113 191.357 89.386 C 192.413 101.439 203.115 110.299 215.324 109.229 C 215.519 109.212 215.712 109.193 215.905 109.171 C 215.451 122.962 212.559 136.226 207.610 148.516 C 204.404 147.193 200.830 146.600 197.116 146.925 C 184.906 147.995 175.908 158.581 176.964 170.634 C 177.471 176.412 180.193 181.456 184.236 185.024 C 175.572 194.235 165.401 202.090 154.058 208.193 "
          />
          <path
            id="S11"
            fill="none"
            stroke="#d3d3d3"
            strokeWidth="3"
            strokeLinejoin="round"
            d="M 24.036 111.126 C 20.561 71.467 50.167 36.635 90.341 33.115 C 130.514 29.595 165.726 58.748 169.201 98.406 C 172.676 138.064 143.071 172.896 102.897 176.416 C 62.723 179.937 27.511 150.784 24.036 111.126 "
          />
          <path
            id="S12"
            fill="none"
            stroke="#d3d3d3"
            strokeWidth="3"
            strokeLinejoin="round"
            d="M 156.968 99.159 C 154.067 66.052 124.672 41.715 91.135 44.654 C 57.597 47.592 32.882 76.670 35.783 109.777 C 38.684 142.884 68.079 167.221 101.617 164.282 C 135.154 161.344 159.869 132.266 156.968 99.159 "
          />
        </g>
        <g id="circle1">
          <path
            id="S1"
            fill="none"
            stroke="#dadada"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M -147.091 238.773 C -147.091 158.027 -81.952 92.888 -1.206 92.888 C 79.540 92.888 144.679 158.027 144.679 238.773 C 144.679 319.520 79.540 384.658 -1.206 384.658 C -81.952 384.658 -147.091 319.520 -147.091 238.773 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#dadada"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M -142.532 239.913 C -142.532 162.321 -79.938 99.727 -2.346 99.726 C 75.247 99.726 137.841 162.321 137.841 239.913 C 137.841 317.505 75.247 380.099 -2.346 380.099 C -79.938 380.099 -142.532 317.505 -142.532 239.913 "
          />
        </g>
        <g id="circle2">
          <path
            id="S1"
            fill="none"
            stroke="#dadada"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 471.781 -26.213 C 471.781 54.533 406.642 119.672 325.896 119.672 C 245.149 119.672 180.011 54.533 180.011 -26.213 C 180.011 -106.960 245.149 -172.098 325.896 -172.098 C 406.642 -172.098 471.781 -106.960 471.781 -26.213 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#dadada"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 467.222 -27.353 C 467.222 50.239 404.628 112.833 327.036 112.833 C 249.443 112.833 186.849 50.239 186.849 -27.353 C 186.849 -104.945 249.443 -167.540 327.036 -167.540 C 404.628 -167.539 467.222 -104.945 467.222 -27.353 "
          />
        </g>
      </g>
      <g id="lenta_group" ref={lentaRef}>
        <g id="lentaItem">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 148.481 25.162 C 148.481 25.161 148.186 18.738 150.542 16.245 C 152.935 13.712 159.087 14.066 159.087 14.066 C 159.098 14.066 266.254 14.066 266.265 14.066 C 266.265 14.066 272.343 13.779 274.242 15.700 C 276.434 17.920 276.285 25.423 276.285 25.424 C 276.285 25.426 276.267 48.479 276.267 48.481 C 276.267 48.482 276.646 54.741 274.616 57.071 C 272.453 59.555 266.136 59.577 266.135 59.577 C 266.125 59.577 159.175 59.577 159.165 59.577 C 159.164 59.577 154.109 59.905 151.096 56.678 C 148.127 53.499 148.463 48.220 148.463 48.219 C 148.463 48.217 148.481 25.165 148.481 25.162 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 155.186 52.563 C 155.186 52.561 155.186 22.775 155.186 22.772 C 155.189 22.772 183.247 22.772 183.249 22.772 C 183.249 22.775 183.249 52.561 183.249 52.563 C 183.247 52.563 155.189 52.563 155.186 52.563 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.902 25.346 C 216.031 25.346 266.286 25.346 266.288 25.346 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 31.091 C 212.171 31.047 255.211 30.958 255.213 30.958 "
          />
          <path
            id="S4_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 35.100 C 212.171 35.055 255.211 34.966 255.213 34.966 "
          />
          <path
            id="S4_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 39.375 C 212.171 39.330 255.211 39.241 255.213 39.241 "
          />
          <path
            id="S4_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 43.784 C 208.703 43.739 244.806 43.650 244.808 43.650 "
          />
          <path
            id="S4_2_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 47.792 C 208.703 47.747 244.806 47.658 244.808 47.658 "
          />
          <path
            id="S4_2_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 52.067 C 208.703 52.023 244.806 51.934 244.808 51.934 "
          />
          <path
            id="S10"
            fill="none"
            stroke="#b1b1b1"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 254.332 51.132 C 259.324 51.177 269.308 51.266 269.309 51.266 "
          />
          <path
            id="S11"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 268.621 18.425 C 268.621 17.274 267.645 16.460 266.562 16.460 C 265.478 16.460 264.502 17.274 264.502 18.425 C 264.502 19.575 265.478 20.390 266.562 20.390 C 267.645 20.390 268.621 19.575 268.621 18.425 "
          />
          <path
            id="S11_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 260.523 18.425 C 260.523 17.274 259.547 16.460 258.463 16.460 C 257.380 16.460 256.404 17.274 256.404 18.425 C 256.404 19.575 257.380 20.390 258.463 20.390 C 259.547 20.390 260.523 19.575 260.523 18.425 "
          />
          <path
            id="S11_2_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 252.213 18.425 C 252.213 17.274 251.237 16.460 250.153 16.460 C 249.069 16.460 248.093 17.274 248.093 18.425 C 248.093 19.575 249.069 20.390 250.153 20.390 C 251.237 20.390 252.213 19.575 252.213 18.425 "
          />
        </g>
        <g id="lentaItem1">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 148.481 83.603 C 148.481 83.603 148.186 77.179 150.542 74.686 C 152.935 72.153 159.087 72.507 159.087 72.507 C 159.098 72.507 266.254 72.507 266.265 72.507 C 266.265 72.507 272.343 72.220 274.242 74.141 C 276.434 76.361 276.285 83.864 276.285 83.865 C 276.285 83.867 276.267 106.920 276.267 106.922 C 276.267 106.923 276.646 113.182 274.616 115.513 C 272.453 117.996 266.136 118.018 266.135 118.018 C 266.125 118.018 159.175 118.018 159.165 118.018 C 159.164 118.018 154.109 118.347 151.096 115.120 C 148.127 111.941 148.463 106.661 148.463 106.661 C 148.463 106.658 148.481 83.606 148.481 83.603 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 155.186 111.005 C 155.186 111.002 155.186 81.216 155.186 81.213 C 155.189 81.213 183.247 81.213 183.249 81.213 C 183.249 81.216 183.249 111.002 183.249 111.005 C 183.247 111.005 155.189 111.005 155.186 111.005 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.902 83.788 C 216.031 83.788 266.286 83.788 266.288 83.788 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 89.533 C 212.171 89.488 255.211 89.399 255.213 89.399 "
          />
          <path
            id="S4_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 93.541 C 212.171 93.496 255.211 93.407 255.213 93.407 "
          />
          <path
            id="S4_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 97.816 C 212.171 97.771 255.211 97.682 255.213 97.682 "
          />
          <path
            id="S4_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 102.225 C 208.703 102.180 244.806 102.091 244.808 102.091 "
          />
          <path
            id="S4_2_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 106.233 C 208.703 106.189 244.806 106.099 244.808 106.099 "
          />
          <path
            id="S4_2_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 110.508 C 208.703 110.464 244.806 110.375 244.808 110.375 "
          />
          <path
            id="S10"
            fill="none"
            stroke="#b1b1b1"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 254.332 109.573 C 259.324 109.618 269.308 109.707 269.309 109.707 "
          />
          <path
            id="S11"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 268.356 77.264 C 268.356 76.113 267.380 75.299 266.297 75.299 C 265.213 75.299 264.237 76.113 264.237 77.264 C 264.237 78.414 265.213 79.228 266.297 79.228 C 267.380 79.228 268.356 78.414 268.356 77.264 "
          />
          <path
            id="S11_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 260.258 77.264 C 260.258 76.113 259.282 75.299 258.198 75.299 C 257.115 75.299 256.139 76.113 256.138 77.264 C 256.138 78.414 257.114 79.228 258.198 79.228 C 259.282 79.228 260.258 78.414 260.258 77.264 "
          />
          <path
            id="S11_2_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 251.948 77.264 C 251.948 76.113 250.972 75.299 249.888 75.299 C 248.804 75.299 247.828 76.113 247.828 77.264 C 247.828 78.414 248.804 79.228 249.888 79.228 C 250.972 79.228 251.948 78.414 251.948 77.264 "
          />
        </g>
        <g id="lentaItem2">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 148.481 141.025 C 148.481 141.024 148.186 134.601 150.542 132.108 C 152.935 129.575 159.087 129.929 159.087 129.929 C 159.098 129.929 266.254 129.929 266.265 129.929 C 266.265 129.929 272.343 129.642 274.242 131.563 C 276.434 133.782 276.285 141.286 276.285 141.287 C 276.285 141.289 276.267 164.341 276.267 164.344 C 276.267 164.345 276.646 170.604 274.616 172.934 C 272.453 175.418 266.136 175.440 266.135 175.440 C 266.125 175.440 159.175 175.440 159.165 175.440 C 159.164 175.440 154.109 175.768 151.096 172.541 C 148.127 169.362 148.463 164.083 148.463 164.082 C 148.463 164.080 148.481 141.028 148.481 141.025 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 155.186 168.426 C 155.186 168.423 155.186 138.638 155.186 138.635 C 155.189 138.635 183.247 138.635 183.249 138.635 C 183.249 138.638 183.249 168.423 183.249 168.426 C 183.247 168.426 155.189 168.426 155.186 168.426 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.902 141.209 C 216.031 141.209 266.286 141.209 266.288 141.209 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 146.954 C 212.171 146.910 255.211 146.821 255.213 146.821 "
          />
          <path
            id="S4_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 150.962 C 212.171 150.918 255.211 150.829 255.213 150.829 "
          />
          <path
            id="S4_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 155.238 C 212.171 155.193 255.211 155.104 255.213 155.104 "
          />
          <path
            id="S4_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 159.647 C 208.703 159.602 244.806 159.513 244.808 159.513 "
          />
          <path
            id="S4_2_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 163.655 C 208.703 163.610 244.806 163.521 244.808 163.521 "
          />
          <path
            id="S4_2_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 167.930 C 208.703 167.886 244.806 167.797 244.808 167.797 "
          />
          <path
            id="S10"
            fill="none"
            stroke="#b1b1b1"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 254.332 166.995 C 259.324 167.040 269.308 167.129 269.309 167.129 "
          />
          <path
            id="S11"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 268.356 134.685 C 268.356 133.535 267.380 132.721 266.297 132.721 C 265.213 132.721 264.237 133.535 264.237 134.685 C 264.237 135.836 265.213 136.650 266.297 136.650 C 267.380 136.650 268.356 135.836 268.356 134.685 "
          />
          <path
            id="S11_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 260.258 134.685 C 260.258 133.535 259.282 132.721 258.198 132.721 C 257.115 132.721 256.139 133.535 256.138 134.685 C 256.138 135.836 257.114 136.650 258.198 136.650 C 259.282 136.650 260.258 135.836 260.258 134.685 "
          />
          <path
            id="S11_2_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 251.948 134.685 C 251.948 133.535 250.972 132.721 249.888 132.721 C 248.804 132.721 247.828 133.535 247.828 134.685 C 247.828 135.836 248.804 136.650 249.888 136.650 C 250.972 136.650 251.948 135.836 251.948 134.685 "
          />
        </g>
        <g id="lentaItem3">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 148.481 197.428 C 148.481 197.427 148.186 191.003 150.542 188.510 C 152.935 185.977 159.087 186.332 159.087 186.332 C 159.098 186.332 266.254 186.332 266.265 186.332 C 266.265 186.332 272.343 186.044 274.242 187.966 C 276.434 190.185 276.285 197.688 276.285 197.689 C 276.285 197.691 276.267 220.744 276.267 220.746 C 276.267 220.747 276.646 227.007 274.616 229.337 C 272.453 231.820 266.136 231.842 266.135 231.842 C 266.125 231.842 159.175 231.842 159.165 231.842 C 159.164 231.842 154.109 232.171 151.096 228.944 C 148.127 225.765 148.463 220.486 148.463 220.485 C 148.463 220.482 148.481 197.430 148.481 197.428 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 155.186 224.829 C 155.186 224.826 155.186 195.040 155.186 195.037 C 155.189 195.037 183.247 195.037 183.249 195.037 C 183.249 195.040 183.249 224.826 183.249 224.829 C 183.247 224.829 155.189 224.829 155.186 224.829 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.902 197.612 C 216.031 197.612 266.286 197.612 266.288 197.612 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 203.357 C 212.171 203.312 255.211 203.223 255.213 203.223 "
          />
          <path
            id="S4_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 207.365 C 212.171 207.320 255.211 207.231 255.213 207.231 "
          />
          <path
            id="S4_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 211.640 C 212.171 211.596 255.211 211.507 255.213 211.507 "
          />
          <path
            id="S4_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 216.049 C 208.703 216.005 244.806 215.916 244.808 215.916 "
          />
          <path
            id="S4_2_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 220.057 C 208.703 220.013 244.806 219.924 244.808 219.924 "
          />
          <path
            id="S4_2_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 224.333 C 208.703 224.288 244.806 224.199 244.808 224.199 "
          />
          <path
            id="S10"
            fill="none"
            stroke="#b1b1b1"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 254.332 223.397 C 259.324 223.442 269.308 223.531 269.309 223.531 "
          />
          <path
            id="S11"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 268.356 191.263 C 268.356 190.112 267.380 189.298 266.297 189.298 C 265.213 189.298 264.237 190.112 264.237 191.263 C 264.237 192.413 265.213 193.227 266.297 193.227 C 267.380 193.227 268.356 192.413 268.356 191.263 "
          />
          <path
            id="S11_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 260.258 191.263 C 260.258 190.112 259.282 189.298 258.198 189.298 C 257.115 189.298 256.139 190.112 256.138 191.263 C 256.138 192.413 257.114 193.227 258.198 193.227 C 259.282 193.227 260.258 192.413 260.258 191.263 "
          />
          <path
            id="S11_2_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 251.948 191.263 C 251.948 190.112 250.972 189.298 249.888 189.298 C 248.804 189.298 247.828 190.112 247.828 191.263 C 247.828 192.413 248.804 193.227 249.888 193.227 C 250.972 193.227 251.948 192.413 251.948 191.263 "
          />
        </g>
        <g id="lentaItem4">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 148.481 254.033 C 148.481 254.032 148.186 247.608 150.542 245.115 C 152.935 242.582 159.087 242.937 159.087 242.937 C 159.098 242.937 266.254 242.937 266.265 242.937 C 266.265 242.937 272.343 242.650 274.242 244.571 C 276.434 246.790 276.285 254.293 276.285 254.294 C 276.285 254.297 276.267 277.349 276.267 277.351 C 276.267 277.352 276.646 283.612 274.616 285.942 C 272.453 288.426 266.136 288.447 266.135 288.447 C 266.125 288.447 159.175 288.447 159.165 288.447 C 159.164 288.447 154.109 288.776 151.096 285.549 C 148.127 282.370 148.463 277.091 148.463 277.090 C 148.463 277.088 148.481 254.035 148.481 254.033 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 155.186 281.434 C 155.186 281.431 155.186 251.645 155.186 251.642 C 155.189 251.642 183.247 251.642 183.249 251.642 C 183.249 251.645 183.249 281.431 183.249 281.434 C 183.247 281.434 155.189 281.434 155.186 281.434 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.902 254.217 C 216.031 254.217 266.286 254.217 266.288 254.217 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 259.962 C 212.171 259.917 255.211 259.828 255.213 259.828 "
          />
          <path
            id="S4_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 263.970 C 212.171 263.925 255.211 263.836 255.213 263.836 "
          />
          <path
            id="S4_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 268.245 C 212.171 268.201 255.211 268.112 255.213 268.112 "
          />
          <path
            id="S4_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 272.654 C 208.703 272.610 244.806 272.521 244.808 272.521 "
          />
          <path
            id="S4_2_3"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 276.662 C 208.703 276.618 244.806 276.529 244.808 276.529 "
          />
          <path
            id="S4_2_2_2"
            fill="none"
            stroke="#bbb4b4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 190.651 280.938 C 208.703 280.893 244.806 280.804 244.808 280.804 "
          />
          <path
            id="S10"
            fill="none"
            stroke="#b1b1b1"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 254.332 280.003 C 259.324 280.047 269.308 280.136 269.309 280.136 "
          />
          <path
            id="S11"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 268.547 248.059 C 268.547 246.908 267.571 246.094 266.488 246.094 C 265.404 246.094 264.428 246.908 264.428 248.059 C 264.428 249.209 265.404 250.023 266.488 250.023 C 267.571 250.023 268.547 249.209 268.547 248.059 "
          />
          <path
            id="S11_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 260.449 248.059 C 260.449 246.908 259.473 246.094 258.389 246.094 C 257.305 246.094 256.329 246.908 256.329 248.059 C 256.329 249.209 257.305 250.023 258.389 250.023 C 259.473 250.023 260.449 249.209 260.449 248.059 "
          />
          <path
            id="S11_2_2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 252.138 248.059 C 252.138 246.908 251.162 246.094 250.079 246.094 C 248.995 246.094 248.019 246.908 248.019 248.059 C 248.019 249.209 248.995 250.023 250.079 250.023 C 251.163 250.023 252.139 249.209 252.138 248.059 "
          />
        </g>
      </g>
      <g id="diag_gr">
        <g id="paper">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 53.292 198.558 C 53.292 198.553 53.292 154.178 53.292 154.173 C 53.294 154.173 74.643 154.173 74.645 154.173 C 74.646 154.174 82.259 164.496 82.260 164.497 C 82.260 164.500 82.260 198.554 82.260 198.558 C 82.257 198.558 53.295 198.558 53.292 198.558 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 82.027 164.229 C 82.026 164.228 75.023 154.770 75.022 154.769 C 75.022 154.770 73.879 164.491 73.879 164.492 C 73.880 164.492 82.026 164.229 82.027 164.229 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 57.174 169.616 C 64.032 169.550 77.747 169.419 77.748 169.419 "
          />
          <path
            id="S3_2"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 57.174 173.163 C 64.032 173.097 77.747 172.966 77.748 172.966 "
          />
          <path
            id="S3_2_2"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 57.174 176.645 C 64.032 176.579 77.747 176.448 77.748 176.448 "
          />
          <path
            id="S3_2_2_2"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 57.174 180.389 C 64.032 180.323 77.747 180.192 77.748 180.192 "
          />
          <path
            id="S3_2_2_2_2"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 57.174 183.936 C 64.032 183.871 77.747 183.739 77.748 183.739 "
          />
          <path
            id="S3_2_2_2_2_2"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 57.174 187.352 C 64.032 187.287 77.747 187.155 77.748 187.155 "
          />
        </g>
        <g id="diagramm">
          <path
            id="S1"
            fill="none"
            stroke="#b1b1b1"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 108.328 177.442 C 108.328 154.712 89.991 136.375 67.261 136.375 C 44.530 136.375 26.193 154.712 26.193 177.442 C 26.193 200.173 44.530 218.510 67.261 218.510 C 89.991 218.510 108.328 200.173 108.328 177.442 "
          />
          <path
            id="S2"
            fill="none"
            stroke="#cdcdcd"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 113.944 177.091 C 113.944 151.252 93.100 130.408 67.261 130.408 C 41.422 130.408 20.577 151.252 20.577 177.091 C 20.577 202.930 41.422 223.775 67.261 223.775 C 93.100 223.775 113.944 202.930 113.944 177.091 "
          />
          <path
            id="diag-3"
            fill="none"
            stroke="#7d7d7d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 66.910 144.799 C 48.647 144.799 33.915 159.531 33.915 177.793 M 66.910 210.788 C 85.172 210.788 99.904 196.056 99.904 177.793 "
          />
          <path
            id="diag-4"
            fill="none"
            stroke="#7d7d7d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 118.507 177.091 C 118.507 148.532 95.469 125.494 66.910 125.494 M 15.312 177.091 C 15.312 205.650 38.351 228.689 66.910 228.689 "
          />
        </g>
      </g>
      <g id="graph_gr">
        <g id="axises">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 310.295 87.953 C 310.295 87.946 310.295 19.163 310.295 19.156 M 408.956 87.953 C 408.946 87.953 310.305 87.953 310.295 87.953 "
          />
        </g>
        <g id="bar1">
          <path
            id="S1"
            fill="#ababab"
            fillRule="evenodd"
            stroke="none"
            d="M 318.582 69.089 C 318.583 69.089 331.729 69.089 331.730 69.089 C 331.730 69.090 331.730 86.387 331.730 86.389 C 331.729 86.389 318.583 86.389 318.582 86.389 C 318.582 86.387 318.582 69.090 318.582 69.089 Z"
          />
        </g>
        <g id="bar2">
          <path
            id="S1"
            fill="#8b8b8b"
            fillRule="evenodd"
            stroke="none"
            d="M 338.131 57.926 C 338.133 57.926 351.278 57.926 351.279 57.926 C 351.279 57.929 351.452 86.386 351.452 86.389 C 351.451 86.389 338.306 86.389 338.304 86.389 C 338.304 86.386 338.131 57.929 338.131 57.926 Z"
          />
        </g>
        <g id="bar3">
          <path
            id="S1"
            fill="#ababab"
            fillRule="evenodd"
            stroke="none"
            d="M 358.891 44.518 C 358.893 44.518 372.038 44.518 372.039 44.518 C 372.039 44.523 372.212 86.557 372.212 86.562 C 372.211 86.562 359.066 86.562 359.064 86.562 C 359.064 86.557 358.891 44.523 358.891 44.518 Z"
          />
        </g>
        <g id="bar4">
          <path
            id="S1"
            fill="#8b8b8b"
            fillRule="evenodd"
            stroke="none"
            d="M 381.728 32.138 C 381.729 32.138 394.874 32.138 394.876 32.138 C 394.876 32.143 395.049 86.556 395.049 86.562 C 395.047 86.562 381.902 86.562 381.901 86.562 C 381.901 86.556 381.728 32.143 381.728 32.138 Z"
          />
        </g>
        <g id="arrow1">
          <path
            id="arrow1-2"
            fill="none"
            stroke="#ffa4a4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 314.327 63.438 C 316.725 58.500 321.519 48.626 321.520 48.625 C 321.522 48.625 338.439 51.774 338.441 51.774 C 338.442 51.772 346.223 36.339 346.224 36.337 C 346.226 36.338 363.324 40.623 363.326 40.624 C 363.326 40.622 371.810 26.933 371.811 26.932 C 371.813 26.931 399.573 20.909 399.575 20.909 "
          />
          {/* <path
            id="S3"
            fill="#b0b0b0"
            fillRule="evenodd"
            stroke="#ffa4a4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 392.459 25.419 C 392.459 25.418 394.945 23.032 394.654 21.794 C 394.357 20.532 390.993 19.499 390.993 19.498 C 390.994 19.498 399.574 20.908 399.575 20.909 C 399.575 20.909 392.460 25.418 392.459 25.419 Z"
          /> */}
        </g>
      </g>
      <g id="clock_gr">
        <g id="clock">
          <path
            id="S1"
            fill="none"
            stroke="#a5a5a5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 310.729 126.296 C 310.729 126.295 310.393 121.143 313.964 117.629 C 316.494 115.140 320.132 113.838 320.133 113.837 C 320.139 113.837 385.567 113.503 385.574 113.503 C 385.575 113.504 390.780 114.302 392.921 116.843 C 394.629 118.872 394.796 123.955 394.796 123.955 C 394.796 123.964 394.402 214.835 394.402 214.845 C 394.401 214.845 394.044 219.855 392.743 221.420 C 391.088 223.411 384.817 224.838 384.817 224.838 C 384.810 224.838 318.946 224.879 318.939 224.879 C 318.939 224.879 314.937 224.473 313.308 222.876 C 311.502 221.106 311.024 216.661 311.024 216.661 C 311.024 216.652 310.729 126.305 310.729 126.296 "
          />
          <path
            id="S1_2"
            fill="none"
            stroke="#8f8f8f"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 315.195 129.928 C 315.195 129.928 314.843 125.237 318.062 121.993 C 320.298 119.740 323.529 118.521 323.529 118.521 C 323.535 118.521 381.526 118.215 381.532 118.215 C 381.532 118.215 386.156 118.991 388.043 121.273 C 389.588 123.141 389.706 127.785 389.706 127.785 C 389.706 127.794 389.356 211.002 389.356 211.010 C 389.356 211.011 389.062 215.591 387.886 217.031 C 386.426 218.818 380.861 220.161 380.861 220.161 C 380.855 220.161 322.477 220.198 322.472 220.198 C 322.471 220.198 318.917 219.799 317.480 218.364 C 315.848 216.735 315.456 212.674 315.456 212.673 C 315.456 212.665 315.195 129.937 315.195 129.928 "
          />
          <path
            id="S3"
            fill="none"
            stroke="#cacaca"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 332.985 161.268 C 332.985 161.267 332.985 145.047 332.985 145.045 C 332.987 145.045 348.318 145.045 348.319 145.045 C 348.319 145.047 348.319 161.267 348.319 161.268 C 348.318 161.268 332.987 161.268 332.985 161.268 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#cacaca"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 357.209 161.713 C 357.209 161.711 357.209 145.047 357.209 145.045 C 357.210 145.045 372.541 145.045 372.543 145.045 C 372.543 145.047 372.543 161.711 372.543 161.713 C 372.541 161.713 357.210 161.713 357.209 161.713 "
          />
          <path
            id="S3_2"
            fill="none"
            stroke="#cacaca"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 332.985 186.826 C 332.985 186.824 332.985 170.604 332.985 170.602 C 332.987 170.602 348.318 170.602 348.319 170.602 C 348.319 170.604 348.319 186.824 348.319 186.826 C 348.318 186.826 332.987 186.826 332.985 186.826 "
          />
          <path
            id="S4_2"
            fill="none"
            stroke="#cacaca"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 357.316 186.627 C 357.316 186.625 357.209 170.604 357.209 170.602 C 357.210 170.602 372.542 170.602 372.543 170.602 C 372.543 170.604 372.757 186.625 372.757 186.627 C 372.756 186.627 357.317 186.627 357.316 186.627 "
          />
        </g>
        <g id="didgits">
          <path
            id="S1"
            fill="#9a9a9a"
            fillRule="evenodd"
            stroke="none"
            d="M 358.050 138.289 C 358.050 136.331 358.050 134.373 358.050 132.415 C 358.976 132.424 359.902 132.432 360.828 132.440 C 361.729 132.440 362.409 132.186 362.867 131.678 C 363.343 131.170 363.580 130.465 363.580 129.564 C 363.580 127.885 363.580 126.206 363.580 124.526 C 363.580 123.625 363.343 122.920 362.867 122.412 C 362.409 121.904 361.729 121.651 360.828 121.651 C 359.271 121.651 357.715 121.651 356.158 121.651 C 356.158 122.470 356.158 123.289 356.158 124.108 C 357.813 124.108 359.468 124.108 361.123 124.108 C 361.122 126.058 361.122 128.008 361.123 129.958 C 360.205 129.958 359.287 129.958 358.370 129.958 C 356.518 129.958 355.593 130.883 355.593 132.735 C 355.593 135.406 355.593 138.076 355.593 140.747 C 357.985 140.747 360.377 140.747 362.769 140.747 C 362.769 139.928 362.769 139.108 362.769 138.289 C 361.196 138.289 359.623 138.289 358.050 138.289 M 349.768 138.289 C 348.973 138.289 348.179 138.289 347.384 138.289 C 347.384 132.735 347.384 127.180 347.384 121.626 C 345.385 121.626 343.386 121.626 341.387 121.626 C 341.387 122.445 341.387 123.265 341.387 124.084 C 342.567 124.084 343.747 124.084 344.926 124.084 C 344.926 128.819 344.926 133.554 344.926 138.289 C 343.722 138.289 342.518 138.289 341.314 138.289 C 341.314 139.108 341.314 139.928 341.314 140.747 C 344.541 140.747 347.769 140.747 350.997 140.747 C 351.357 140.747 351.652 140.648 351.882 140.452 C 352.111 140.239 352.226 139.928 352.226 139.518 C 352.225 138.150 352.225 136.782 352.226 135.414 C 351.406 135.414 350.587 135.414 349.768 135.414 C 349.768 136.372 349.768 137.331 349.768 138.289 Z"
          />
          <path
            id="S2"
            fill="#9a9a9a"
            fillRule="evenodd"
            stroke="none"
            d="M 351.711 209.925 C 352.991 209.925 354.271 209.925 355.551 209.925 C 355.551 211.334 355.551 212.742 355.551 214.150 C 354.271 214.150 352.991 214.150 351.711 214.150 C 351.711 212.742 351.711 211.334 351.711 209.925 M 351.711 207.182 C 351.711 204.220 351.711 201.257 351.711 198.294 C 352.598 198.294 353.485 198.294 354.372 198.294 C 354.372 197.371 354.372 196.447 354.372 195.523 C 352.963 195.524 351.555 195.524 350.147 195.523 C 349.708 195.523 349.397 195.661 349.214 195.935 C 349.050 196.209 348.968 196.538 348.968 196.923 C 348.967 203.003 348.968 209.084 348.968 215.165 C 348.968 215.787 349.105 216.235 349.379 216.509 C 349.653 216.765 350.111 216.893 350.751 216.893 C 352.671 216.893 354.591 216.893 356.511 216.893 C 357.152 216.893 357.609 216.765 357.883 216.509 C 358.157 216.235 358.295 215.787 358.295 215.165 C 358.294 213.117 358.294 211.068 358.295 209.020 C 358.295 208.343 358.185 207.868 357.965 207.594 C 357.746 207.319 357.307 207.182 356.649 207.182 C 355.003 207.182 353.357 207.182 351.711 207.182 Z"
          />
          <path
            id="S3"
            fill="#9a9a9a"
            fillRule="evenodd"
            stroke="none"
            d="M 383.960 160.961 C 383.987 162.535 383.923 164.110 383.960 165.683 C 383.978 166.416 383.878 166.952 383.635 167.305 C 383.441 167.591 383.171 167.771 382.800 167.788 C 380.775 167.885 378.745 167.823 376.719 167.788 C 376.703 168.737 376.703 169.685 376.719 170.633 C 378.745 170.599 380.775 170.537 382.800 170.633 C 383.171 170.651 383.442 170.830 383.635 171.117 C 383.880 171.432 383.978 171.950 383.960 172.682 C 383.922 174.255 383.992 175.830 383.960 177.404 C 382.305 177.371 380.649 177.434 378.993 177.404 C 378.976 178.352 378.976 179.301 378.993 180.249 C 380.649 180.219 382.306 180.316 383.960 180.249 C 384.647 180.221 385.190 179.927 385.608 179.452 C 386.110 178.882 386.309 178.200 386.281 177.404 C 386.217 175.584 386.251 173.762 386.281 171.942 C 386.291 171.338 386.217 170.831 386.072 170.406 C 385.954 169.986 385.770 169.540 385.376 169.183 C 385.769 168.825 385.953 168.389 386.072 167.988 C 386.216 167.544 386.291 167.027 386.281 166.423 C 386.251 164.603 386.216 162.781 386.281 160.961 C 386.310 160.166 386.110 159.493 385.608 158.941 C 385.191 158.448 384.649 158.146 383.960 158.116 C 380.791 157.979 377.616 158.159 374.444 158.116 C 374.431 159.065 374.431 160.013 374.444 160.961 C 377.616 160.918 380.789 161.016 383.960 160.961 Z"
          />
          <path
            id="S4"
            fill="#9a9a9a"
            fillRule="evenodd"
            stroke="none"
            d="M 326.676 165.706 C 325.005 165.720 323.334 165.720 321.663 165.706 C 321.674 164.242 321.674 162.777 321.663 161.313 C 323.334 161.299 325.005 161.299 326.676 161.313 C 326.664 162.777 326.664 164.242 326.676 165.706 M 326.676 168.522 C 326.652 171.545 326.657 174.568 326.676 177.591 C 325.525 177.598 324.373 177.581 323.222 177.591 C 323.229 178.529 323.229 179.468 323.222 180.407 C 324.883 180.420 326.544 180.382 328.205 180.407 C 328.649 180.414 329.016 180.288 329.305 180.013 C 329.578 179.734 329.726 179.398 329.733 178.999 C 329.839 172.635 329.847 166.268 329.733 159.904 C 329.726 159.524 329.568 159.196 329.275 158.919 C 328.984 158.625 328.628 158.489 328.205 158.496 C 325.515 158.541 322.824 158.540 320.134 158.496 C 319.711 158.489 319.344 158.625 319.034 158.919 C 318.760 159.197 318.612 159.524 318.606 159.904 C 318.566 162.307 318.566 164.711 318.606 167.114 C 318.612 167.494 318.760 167.822 319.034 168.100 C 319.344 168.394 319.711 168.529 320.134 168.522 C 322.314 168.488 324.495 168.505 326.676 168.522 Z"
          />
        </g>
        <g id="arr1">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 352.520 168.997 C 352.590 175.965 352.728 189.900 352.728 189.900 "
          />
        </g>
        <g id="arr2">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 352.454 168.915 C 352.458 159.554 352.465 140.833 352.465 140.832 "
          />
        </g>
      </g>
      <g id="noyt_gr">
        <g id="noytbook">
          <path
            id="S1"
            fill="none"
            stroke="#383838"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 30.224 80.180 C 30.224 80.175 30.224 31.832 30.224 31.827 C 30.233 31.827 110.397 31.827 110.405 31.827 C 110.405 31.832 110.405 80.175 110.405 80.180 C 110.397 80.180 30.233 80.180 30.224 80.180 "
          />
          <path
            id="S2"
            fill="#e1e1e1"
            fillRule="evenodd"
            stroke="#838282"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 34.959 38.244 C 34.966 38.244 106.070 38.060 106.078 38.060 C 106.077 38.064 105.946 76.099 105.946 76.103 C 105.939 76.103 35.177 76.339 35.170 76.339 C 35.170 76.336 34.959 38.248 34.959 38.244 Z"
          />
          <path
            id="S3"
            fill="none"
            stroke="#383838"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 68.700 34.995 C 68.700 34.191 69.400 33.568 70.235 33.568 C 71.069 33.568 71.769 34.191 71.769 34.995 C 71.769 35.800 71.069 36.423 70.235 36.423 C 69.400 36.423 68.700 35.800 68.700 34.995 "
          />
          <path
            id="S4"
            fill="none"
            stroke="#383838"
            strokeWidth="1"
            strokeLinejoin="round"
            d="M 102.615 40.819 C 102.627 41.735 102.651 43.566 102.651 43.566 "
          />
          <path
            id="S4_2"
            fill="none"
            stroke="#383838"
            strokeWidth="1"
            strokeLinejoin="round"
            d="M 101.288 41.374 C 101.300 42.105 101.324 43.566 101.324 43.566 "
          />
          <path
            id="S4_2_2"
            fill="none"
            stroke="#383838"
            strokeWidth="1"
            strokeLinejoin="round"
            d="M 99.782 42.087 C 99.782 42.580 99.782 43.566 99.782 43.566 "
          />
          <path
            id="S4_2_2_3"
            fill="none"
            stroke="#383838"
            strokeWidth="1"
            strokeLinejoin="round"
            d="M 98.395 42.821 C 98.395 43.069 98.395 43.566 98.395 43.566 "
          />
          <path
            id="S8"
            fill="#4b4b4b"
            fillRule="evenodd"
            stroke="none"
            d="M 29.390 80.374 C 29.398 80.374 110.773 80.385 110.781 80.385 C 110.783 80.386 129.004 90.539 129.006 90.540 C 128.994 90.540 11.116 90.563 11.105 90.563 C 11.106 90.562 29.388 80.375 29.390 80.374 Z"
          />
          <path
            id="S9"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 30.931 81.147 C 30.931 81.147 37.521 81.147 37.521 81.147 C 36.565 81.846 34.653 83.244 34.653 83.244 C 34.652 83.244 29.839 83.243 27.432 83.242 C 27.432 83.242 30.930 81.147 30.931 81.147 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 34.653 83.244 C 34.653 83.244 36.565 81.846 37.521 81.147 "
          />
          <path
            id="S10"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 37.521 81.147 C 37.522 81.147 44.109 81.148 44.109 81.148 C 43.345 81.847 41.816 83.244 41.816 83.244 C 41.815 83.244 34.654 83.244 34.653 83.244 C 34.653 83.244 36.565 81.846 37.521 81.147 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 41.816 83.244 C 41.816 83.244 43.345 81.847 44.109 81.148 "
          />
          <path
            id="S11"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 44.109 81.148 C 44.110 81.148 50.694 81.149 50.695 81.149 C 50.122 81.847 48.978 83.244 48.978 83.244 C 48.977 83.244 41.816 83.244 41.816 83.244 C 41.816 83.244 43.345 81.847 44.109 81.148 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 48.978 83.244 C 48.978 83.244 50.122 81.847 50.695 81.149 "
          />
          <path
            id="S12"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 50.695 81.149 C 50.695 81.149 57.276 81.150 57.277 81.150 C 56.898 81.848 56.141 83.244 56.141 83.244 C 56.140 83.244 48.979 83.244 48.978 83.244 C 48.978 83.244 50.122 81.847 50.695 81.149 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 56.141 83.244 C 56.141 83.244 56.898 81.848 57.277 81.150 "
          />
          <path
            id="S13"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 57.277 81.150 C 57.278 81.150 63.856 81.150 63.857 81.150 C 63.672 81.848 63.303 83.244 63.303 83.244 C 63.302 83.244 56.141 83.244 56.141 83.244 C 56.141 83.244 56.898 81.848 57.277 81.150 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 63.303 83.244 C 63.303 83.244 63.672 81.848 63.857 81.150 "
          />
          <path
            id="S14"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 63.857 81.150 C 63.857 81.150 70.433 81.151 70.433 81.151 C 70.444 81.849 70.465 83.244 70.465 83.244 C 70.465 83.244 63.304 83.244 63.303 83.244 C 63.303 83.244 63.672 81.848 63.857 81.150 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 70.465 83.244 C 70.465 83.244 70.444 81.849 70.433 81.151 "
          />
          <path
            id="S15"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 70.433 81.151 C 70.434 81.151 77.007 81.152 77.008 81.152 C 77.214 81.849 77.628 83.244 77.628 83.244 C 77.627 83.244 70.466 83.244 70.465 83.244 C 70.465 83.244 70.444 81.849 70.433 81.151 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 77.628 83.244 C 77.628 83.244 77.214 81.849 77.008 81.152 "
          />
          <path
            id="S16"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 77.008 81.152 C 77.008 81.152 83.578 81.152 83.579 81.152 C 83.983 81.850 84.790 83.244 84.790 83.244 C 84.790 83.244 77.629 83.244 77.628 83.244 C 77.628 83.244 77.214 81.849 77.008 81.152 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 84.790 83.244 C 84.790 83.244 83.983 81.850 83.579 81.152 "
          />
          <path
            id="S17"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 83.579 81.152 C 83.579 81.152 90.146 81.153 90.147 81.153 C 90.749 81.850 91.953 83.244 91.953 83.244 C 91.952 83.244 84.791 83.244 84.790 83.244 C 84.790 83.244 83.983 81.850 83.579 81.152 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 91.953 83.244 C 91.953 83.244 90.749 81.850 90.147 81.153 "
          />
          <path
            id="S18"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 90.147 81.153 C 90.148 81.153 96.712 81.154 96.713 81.154 C 97.514 81.851 99.115 83.244 99.115 83.244 C 99.115 83.244 91.954 83.244 91.953 83.244 C 91.953 83.244 90.749 81.850 90.147 81.153 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 99.115 83.244 C 99.115 83.244 97.514 81.851 96.713 81.154 "
          />
          <path
            id="S19"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 96.713 81.154 C 96.713 81.154 103.275 81.155 103.275 81.155 C 104.276 81.851 106.277 83.244 106.278 83.244 C 106.277 83.244 99.116 83.244 99.115 83.244 C 99.115 83.244 97.514 81.851 96.713 81.154 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 106.278 83.244 C 106.277 83.244 104.276 81.851 103.275 81.155 "
          />
          <path
            id="S20"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 109.835 81.155 C 109.836 81.156 113.379 83.246 113.379 83.246 C 111.012 83.245 106.278 83.244 106.278 83.244 C 106.277 83.244 104.276 81.851 103.275 81.155 C 103.276 81.155 109.835 81.155 109.835 81.155 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 27.432 83.242 C 29.839 83.243 34.652 83.244 34.653 83.244 "
          />
          <path
            id="S21"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 23.246 85.749 C 23.246 85.749 27.431 83.242 27.432 83.242 C 29.839 83.243 34.652 83.244 34.653 83.244 C 34.653 83.244 31.182 85.747 31.182 85.747 C 31.181 85.747 25.891 85.748 23.246 85.749 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 31.182 85.747 C 31.182 85.747 34.653 83.244 34.653 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 34.653 83.244 C 34.654 83.244 41.815 83.244 41.816 83.244 "
          />
          <path
            id="S22"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 31.182 85.747 C 31.182 85.747 34.653 83.244 34.653 83.244 C 34.654 83.244 41.815 83.244 41.816 83.244 C 41.815 83.244 39.046 85.747 39.046 85.747 C 39.045 85.747 31.182 85.747 31.182 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 39.046 85.747 C 39.046 85.747 41.815 83.244 41.816 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 41.816 83.244 C 41.816 83.244 48.977 83.244 48.978 83.244 "
          />
          <path
            id="S23"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 39.046 85.747 C 39.046 85.747 41.815 83.244 41.816 83.244 C 41.816 83.244 48.977 83.244 48.978 83.244 C 48.978 83.244 46.911 85.747 46.910 85.747 C 46.910 85.747 39.047 85.747 39.046 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 46.910 85.747 C 46.911 85.747 48.978 83.244 48.978 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 48.978 83.244 C 48.979 83.244 56.140 83.244 56.141 83.244 "
          />
          <path
            id="S24"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 46.910 85.747 C 46.911 85.747 48.978 83.244 48.978 83.244 C 48.979 83.244 56.140 83.244 56.141 83.244 C 56.140 83.244 54.775 85.747 54.775 85.747 C 54.774 85.747 46.911 85.747 46.910 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 54.775 85.747 C 54.775 85.747 56.140 83.244 56.141 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 56.141 83.244 C 56.141 83.244 63.302 83.244 63.303 83.244 "
          />
          <path
            id="S25"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 54.775 85.747 C 54.775 85.747 56.140 83.244 56.141 83.244 C 56.141 83.244 63.302 83.244 63.303 83.244 C 63.303 83.244 62.639 85.747 62.639 85.747 C 62.639 85.747 54.776 85.747 54.775 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 62.639 85.747 C 62.639 85.747 63.303 83.244 63.303 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 63.303 83.244 C 63.304 83.244 70.465 83.244 70.465 83.244 "
          />
          <path
            id="S26"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 62.639 85.747 C 62.639 85.747 63.303 83.244 63.303 83.244 C 63.304 83.244 70.465 83.244 70.465 83.244 C 70.465 83.244 70.504 85.747 70.504 85.747 C 70.503 85.747 62.640 85.747 62.639 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 70.504 85.747 C 70.504 85.747 70.465 83.244 70.465 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 70.465 83.244 C 70.466 83.244 77.627 83.244 77.628 83.244 "
          />
          <path
            id="S27"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 70.504 85.747 C 70.504 85.747 70.465 83.244 70.465 83.244 C 70.466 83.244 77.627 83.244 77.628 83.244 C 77.628 83.244 78.368 85.747 78.368 85.747 C 78.367 85.747 70.504 85.747 70.504 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 78.368 85.747 C 78.368 85.747 77.628 83.244 77.628 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 77.628 83.244 C 77.629 83.244 84.790 83.244 84.790 83.244 "
          />
          <path
            id="S28"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 78.368 85.747 C 78.368 85.747 77.628 83.244 77.628 83.244 C 77.629 83.244 84.790 83.244 84.790 83.244 C 84.790 83.244 86.232 85.747 86.232 85.747 C 86.232 85.747 78.369 85.747 78.368 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 86.232 85.747 C 86.232 85.747 84.790 83.244 84.790 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 84.790 83.244 C 84.791 83.244 91.952 83.244 91.953 83.244 "
          />
          <path
            id="S29"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 86.232 85.747 C 86.232 85.747 84.790 83.244 84.790 83.244 C 84.791 83.244 91.952 83.244 91.953 83.244 C 91.953 83.244 94.097 85.747 94.097 85.747 C 94.096 85.747 86.233 85.747 86.232 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 94.097 85.747 C 94.097 85.747 91.953 83.244 91.953 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 91.953 83.244 C 91.954 83.244 99.115 83.244 99.115 83.244 "
          />
          <path
            id="S30"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 94.097 85.747 C 94.097 85.747 91.953 83.244 91.953 83.244 C 91.954 83.244 99.115 83.244 99.115 83.244 C 99.116 83.244 101.961 85.747 101.961 85.747 C 101.961 85.747 94.098 85.747 94.097 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 101.961 85.747 C 101.961 85.747 99.116 83.244 99.115 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 99.115 83.244 C 99.116 83.244 106.277 83.244 106.278 83.244 "
          />
          <path
            id="S31"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 101.961 85.747 C 101.961 85.747 99.116 83.244 99.115 83.244 C 99.116 83.244 106.277 83.244 106.278 83.244 C 106.278 83.244 109.825 85.747 109.826 85.747 C 109.825 85.747 101.962 85.747 101.961 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 113.379 83.246 C 111.012 83.245 106.278 83.244 106.278 83.244 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 106.278 83.244 C 106.278 83.244 109.825 85.747 109.826 85.747 "
          />
          <path
            id="S32"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 109.826 85.747 C 109.826 85.747 115.020 85.746 117.617 85.745 C 117.616 85.745 113.380 83.246 113.379 83.246 C 111.012 83.245 106.278 83.244 106.278 83.244 C 106.278 83.244 109.825 85.747 109.826 85.747 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 23.246 85.749 C 25.891 85.748 31.181 85.747 31.182 85.747 "
          />
          <path
            id="S33"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 18.149 88.802 C 18.150 88.801 23.246 85.749 23.246 85.749 C 25.891 85.748 31.181 85.747 31.182 85.747 C 31.181 85.748 28.324 87.783 26.895 88.800 C 26.894 88.800 18.150 88.802 18.149 88.802 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 26.895 88.800 C 28.324 87.783 31.181 85.748 31.182 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 31.182 85.747 C 31.182 85.747 39.045 85.747 39.046 85.747 "
          />
          <path
            id="S34"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 35.636 88.799 C 35.635 88.799 26.896 88.800 26.895 88.800 C 28.324 87.783 31.181 85.748 31.182 85.747 C 31.182 85.747 39.045 85.747 39.046 85.747 C 39.046 85.748 36.773 87.782 35.636 88.799 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 35.636 88.799 C 36.773 87.782 39.046 85.748 39.046 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 39.046 85.747 C 39.047 85.747 46.910 85.747 46.910 85.747 "
          />
          <path
            id="S35"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 44.372 88.798 C 44.371 88.798 35.637 88.799 35.636 88.799 C 36.773 87.782 39.046 85.748 39.046 85.747 C 39.047 85.747 46.910 85.747 46.910 85.747 C 46.910 85.748 45.218 87.781 44.372 88.798 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 44.372 88.798 C 45.218 87.781 46.910 85.748 46.910 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 46.910 85.747 C 46.911 85.747 54.774 85.747 54.775 85.747 "
          />
          <path
            id="S36"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 53.103 88.797 C 53.102 88.797 44.373 88.798 44.372 88.798 C 45.218 87.781 46.910 85.748 46.910 85.747 C 46.911 85.747 54.774 85.747 54.775 85.747 C 54.775 85.748 53.660 87.780 53.103 88.797 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 53.103 88.797 C 53.660 87.780 54.775 85.748 54.775 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 54.775 85.747 C 54.776 85.747 62.639 85.747 62.639 85.747 "
          />
          <path
            id="S37"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 61.829 88.796 C 61.828 88.796 53.104 88.797 53.103 88.797 C 53.660 87.780 54.775 85.748 54.775 85.747 C 54.776 85.747 62.639 85.747 62.639 85.747 C 62.639 85.748 62.099 87.779 61.829 88.796 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 61.829 88.796 C 62.099 87.779 62.639 85.748 62.639 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 62.639 85.747 C 62.640 85.747 70.503 85.747 70.504 85.747 "
          />
          <path
            id="S38"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 70.550 88.794 C 70.549 88.794 61.830 88.796 61.829 88.796 C 62.099 87.779 62.639 85.748 62.639 85.747 C 62.640 85.747 70.503 85.747 70.504 85.747 C 70.504 85.748 70.535 87.779 70.550 88.794 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 70.550 88.794 C 70.535 87.779 70.504 85.748 70.504 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 70.504 85.747 C 70.504 85.747 78.367 85.747 78.368 85.747 "
          />
          <path
            id="S39"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 79.266 88.793 C 79.265 88.793 70.551 88.794 70.550 88.794 C 70.535 87.779 70.504 85.748 70.504 85.747 C 70.504 85.747 78.367 85.747 78.368 85.747 C 78.368 85.748 78.967 87.778 79.266 88.793 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 79.266 88.793 C 78.967 87.778 78.368 85.748 78.368 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 78.368 85.747 C 78.369 85.747 86.232 85.747 86.232 85.747 "
          />
          <path
            id="S40"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 87.978 88.792 C 87.977 88.792 79.267 88.793 79.266 88.793 C 78.967 87.778 78.368 85.748 78.368 85.747 C 78.369 85.747 86.232 85.747 86.232 85.747 C 86.233 85.748 87.396 87.777 87.978 88.792 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 87.978 88.792 C 87.396 87.777 86.233 85.748 86.232 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 86.232 85.747 C 86.233 85.747 94.096 85.747 94.097 85.747 "
          />
          <path
            id="S41"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 96.684 88.791 C 96.683 88.791 87.978 88.792 87.978 88.792 C 87.396 87.777 86.233 85.748 86.232 85.747 C 86.233 85.747 94.096 85.747 94.097 85.747 C 94.097 85.748 95.822 87.776 96.684 88.791 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 96.684 88.791 C 95.822 87.776 94.097 85.748 94.097 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 94.097 85.747 C 94.098 85.747 101.961 85.747 101.961 85.747 "
          />
          <path
            id="S42"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 105.385 88.790 C 105.384 88.790 96.685 88.791 96.684 88.791 C 95.822 87.776 94.097 85.748 94.097 85.747 C 94.098 85.747 101.961 85.747 101.961 85.747 C 101.962 85.748 104.244 87.775 105.385 88.790 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 105.385 88.790 C 104.244 87.775 101.962 85.748 101.961 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 101.961 85.747 C 101.962 85.747 109.825 85.747 109.826 85.747 "
          />
          <path
            id="S43"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 114.082 88.788 C 114.081 88.788 105.386 88.790 105.385 88.790 C 104.244 87.775 101.962 85.748 101.961 85.747 C 101.962 85.747 109.825 85.747 109.826 85.747 C 109.826 85.748 112.663 87.775 114.082 88.788 Z"
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 114.082 88.788 C 112.663 87.775 109.826 85.748 109.826 85.747 "
          />
          <path
            fill="none"
            stroke="#e8e8e8"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="round"
            d="M 109.826 85.747 C 109.826 85.747 115.020 85.746 117.617 85.745 "
          />
          <path
            id="S44"
            fill="#e8e8e8"
            fillRule="evenodd"
            stroke="none"
            d="M 114.082 88.788 C 112.663 87.775 109.826 85.748 109.826 85.747 C 109.826 85.747 115.020 85.746 117.617 85.745 C 117.617 85.746 122.773 88.787 122.773 88.787 C 122.773 88.787 114.083 88.788 114.082 88.788 Z"
          />
          <path
            id="S45"
            fill="none"
            stroke="#3b3b3b"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 23.246 85.749 C 25.891 85.748 31.181 85.747 31.182 85.747 C 31.182 85.747 39.045 85.747 39.046 85.747 C 39.047 85.747 46.910 85.747 46.910 85.747 C 46.910 85.748 45.218 87.781 44.372 88.798 C 44.371 88.798 35.637 88.799 35.636 88.799 C 35.635 88.799 26.896 88.800 26.895 88.800 C 28.324 87.783 31.181 85.748 31.182 85.747 C 31.182 85.747 34.653 83.244 34.653 83.244 C 34.653 83.244 36.565 81.846 37.521 81.147 C 37.522 81.147 44.109 81.148 44.109 81.148 C 44.110 81.148 50.694 81.149 50.695 81.149 C 50.122 81.847 48.978 83.244 48.978 83.244 C 48.978 83.244 46.911 85.747 46.910 85.747 C 46.911 85.747 54.774 85.747 54.775 85.747 C 54.775 85.748 53.660 87.780 53.103 88.797 C 53.102 88.797 44.373 88.798 44.372 88.798 M 61.829 88.796 C 62.099 87.779 62.639 85.748 62.639 85.747 C 62.639 85.747 63.303 83.244 63.303 83.244 C 63.303 83.244 63.672 81.848 63.857 81.150 C 63.857 81.150 70.433 81.151 70.433 81.151 C 70.444 81.849 70.465 83.244 70.465 83.244 C 70.465 83.244 70.504 85.747 70.504 85.747 C 70.504 85.748 70.535 87.779 70.550 88.794 C 70.549 88.794 61.830 88.796 61.829 88.796 C 61.828 88.796 53.104 88.797 53.103 88.797 M 54.775 85.747 C 54.775 85.747 56.140 83.244 56.141 83.244 C 56.141 83.244 56.898 81.848 57.277 81.150 C 57.278 81.150 63.856 81.150 63.857 81.150 M 30.931 81.147 C 30.931 81.147 37.521 81.147 37.521 81.147 M 27.432 83.242 C 27.432 83.242 30.930 81.147 30.931 81.147 M 23.246 85.749 C 23.246 85.749 27.431 83.242 27.432 83.242 C 29.839 83.243 34.652 83.244 34.653 83.244 C 34.654 83.244 41.815 83.244 41.816 83.244 C 41.815 83.244 39.046 85.747 39.046 85.747 C 39.046 85.748 36.773 87.782 35.636 88.799 M 18.149 88.802 C 18.150 88.801 23.246 85.749 23.246 85.749 M 26.895 88.800 C 26.894 88.800 18.150 88.802 18.149 88.802 M 79.266 88.793 C 79.265 88.793 70.551 88.794 70.550 88.794 M 87.978 88.792 C 87.977 88.792 79.267 88.793 79.266 88.793 C 78.967 87.778 78.368 85.748 78.368 85.747 C 78.368 85.747 77.628 83.244 77.628 83.244 C 77.628 83.244 77.214 81.849 77.008 81.152 C 77.008 81.152 83.578 81.152 83.579 81.152 C 83.983 81.850 84.790 83.244 84.790 83.244 C 84.790 83.244 86.232 85.747 86.232 85.747 C 86.233 85.748 87.396 87.777 87.978 88.792 C 87.978 88.792 96.683 88.791 96.684 88.791 C 96.685 88.791 105.384 88.790 105.385 88.790 C 105.386 88.790 114.081 88.788 114.082 88.788 C 112.663 87.775 109.826 85.748 109.826 85.747 C 109.825 85.747 101.962 85.747 101.961 85.747 C 101.962 85.748 104.244 87.775 105.385 88.790 M 54.775 85.747 C 54.776 85.747 62.639 85.747 62.639 85.747 C 62.640 85.747 70.503 85.747 70.504 85.747 C 70.504 85.747 78.367 85.747 78.368 85.747 C 78.369 85.747 86.232 85.747 86.232 85.747 C 86.233 85.747 94.096 85.747 94.097 85.747 C 94.097 85.748 95.822 87.776 96.684 88.791 M 101.961 85.747 C 101.961 85.747 99.116 83.244 99.115 83.244 C 99.115 83.244 97.514 81.851 96.713 81.154 C 96.713 81.154 103.275 81.155 103.275 81.155 C 103.276 81.155 109.835 81.155 109.835 81.155 C 109.836 81.156 113.379 83.246 113.379 83.246 C 113.380 83.246 117.616 85.745 117.617 85.745 C 115.020 85.746 109.826 85.747 109.826 85.747 C 109.825 85.747 106.278 83.244 106.278 83.244 C 106.277 83.244 104.276 81.851 103.275 81.155 M 94.097 85.747 C 94.097 85.747 91.953 83.244 91.953 83.244 C 91.953 83.244 90.749 81.850 90.147 81.153 C 90.148 81.153 96.712 81.154 96.713 81.154 M 83.579 81.152 C 83.579 81.152 90.146 81.153 90.147 81.153 M 70.433 81.151 C 70.434 81.151 77.007 81.152 77.008 81.152 M 50.695 81.149 C 50.695 81.149 57.276 81.150 57.277 81.150 M 41.816 83.244 C 41.816 83.244 43.345 81.847 44.109 81.148 M 94.097 85.747 C 94.098 85.747 101.961 85.747 101.961 85.747 M 122.773 88.787 C 122.773 88.787 114.083 88.788 114.082 88.788 M 117.617 85.745 C 117.617 85.746 122.773 88.787 122.773 88.787 M 41.816 83.244 C 41.816 83.244 48.977 83.244 48.978 83.244 C 48.979 83.244 56.140 83.244 56.141 83.244 C 56.141 83.244 63.302 83.244 63.303 83.244 C 63.304 83.244 70.465 83.244 70.465 83.244 C 70.466 83.244 77.627 83.244 77.628 83.244 C 77.629 83.244 84.790 83.244 84.790 83.244 C 84.791 83.244 91.952 83.244 91.953 83.244 C 91.954 83.244 99.115 83.244 99.115 83.244 C 99.116 83.244 106.277 83.244 106.278 83.244 C 106.278 83.244 111.012 83.245 113.379 83.246 "
          />
          <path
            id="S46"
            fill="none"
            stroke="#3b3b3b"
            strokeWidth="3"
            strokeLinejoin="round"
            d="M 11.132 91.692 C 50.319 91.697 128.689 91.706 128.693 91.706 "
          />
        </g>
        <g id="stroks">
          <path
            id="stroke-1"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 38.123 44.193 C 53.408 44.052 83.977 43.769 83.978 43.769 "
          />
          <path
            id="stroke-2"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 38.548 49.428 C 46.707 49.381 63.024 49.287 63.024 49.287 "
          />
          <path
            id="stroke-3"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 67.269 49.145 C 77.786 49.051 98.819 48.862 98.820 48.862 "
          />
          <path
            id="stroke-4"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 38.831 54.097 C 55.856 54.050 89.905 53.956 89.906 53.956 "
          />
          <path
            id="stroke-5"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 38.831 58.342 C 50.008 58.389 72.361 58.483 72.362 58.483 "
          />
          <path
            id="stroke-6"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 38.689 62.162 C 55.714 62.115 89.763 62.020 89.765 62.020 "
          />
          <path
            id="stroke-7"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 38.689 66.265 C 59.393 66.123 100.799 65.840 100.801 65.840 "
          />
          <path
            id="stroke-8"
            fill="none"
            stroke="#707070"
            strokeWidth="2"
            strokeLinejoin="round"
            d="M 38.689 70.226 C 51.517 70.179 77.172 70.085 77.173 70.085 "
          />
        </g>
      </g>
    </svg>
  );
};
