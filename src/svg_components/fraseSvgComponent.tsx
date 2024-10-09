"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function FraseSvgComponent() {
  const groupRef = useRef(null);
  const trigerRef = useRef(null);
  const endBox = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    (context, contextSafe) => {
      const tl = gsap.timeline();

      tl.fromTo(
        groupRef.current,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: "#check",
            start: "top top",
            endTrigger: "#endCheck",
            // pin: true,
            scrub: 0.3,
            end: "bottom 50%+=500",
          },
        }
      );
      // const pin = gsap.fromTo(
      //   groupRef.current,
      //   { opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 },
      //   {
      //     opacity: 1,

      //     strokeDashoffset: 0,
      //     ease: "none",
      //     duration: 0.35,
      //     scrollTrigger: {
      //       trigger: trigerRef.current,
      //       //            endTrigger: endBox.current,
      //       start: "top-=100px top",
      //       end: "2000 bottom",

      //       scrub: 0.6,
      //       pin: true,
      //     },
      //   }
      // );

      return () => {
        tl.kill();
      };
    },
    {
      scope: groupRef,
      revertOnUpdate: true,
    }
  );

  return (
    <section className="min-h-[100vh]">
      <div id="check" className="w-full h-[2px]"></div>
      <div className="w-[80%] mx-auto place-content-center" id="viewBox">
        <svg
          ref={trigerRef}
          version="1.1"
          id="Frame_0"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="100%"
          height="100%"
          viewBox="0 0 426 240"
          fill="none"
        >
          <g id="line2" ref={groupRef}>
            <path
              id="line-2"
              fill="none"
              stroke="#202020"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 389.458 184.650 C 389.458 183.641 389.458 182.633 389.458 181.624 C 389.458 175.116 388.635 170.172 386.990 166.791 C 385.344 163.409 382.996 161.719 379.946 161.719 C 376.915 161.719 374.578 163.395 372.932 166.748 C 371.286 170.073 370.454 174.960 370.433 181.410 C 370.433 182.419 370.433 183.428 370.433 184.437 C 370.433 190.773 371.256 195.689 372.902 199.184 C 374.547 202.679 376.915 204.427 380.006 204.427 C 383.036 204.427 385.364 202.750 386.990 199.397 C 388.615 196.016 389.438 191.100 389.458 184.650 M 398.609 181.666 C 398.609 182.590 398.609 183.513 398.609 184.437 C 398.609 190.546 397.846 195.902 396.321 200.505 C 394.796 205.109 392.609 208.661 389.759 211.161 C 386.929 213.662 383.678 214.912 380.006 214.912 C 376.374 214.912 373.133 213.676 370.283 211.204 C 367.433 208.732 365.226 205.208 363.660 200.633 C 362.095 196.030 361.303 190.745 361.282 184.778 C 361.282 183.755 361.282 182.732 361.282 181.709 C 361.282 175.600 362.055 170.229 363.600 165.597 C 365.166 160.937 367.363 157.371 370.193 154.899 C 373.042 152.398 376.293 151.148 379.946 151.148 C 383.598 151.148 386.839 152.398 389.669 154.899 C 392.518 157.371 394.716 160.937 396.261 165.597 C 397.826 170.229 398.609 175.585 398.609 181.666 M 357.008 152.001 C 357.008 155.454 357.008 158.906 357.008 162.358 C 350.455 162.359 343.903 162.359 337.351 162.358 C 337.351 179.592 337.351 196.826 337.351 214.059 C 334.341 214.059 331.331 214.059 328.321 214.059 C 328.321 193.373 328.321 172.687 328.321 152.001 C 337.883 152.001 347.445 152.001 357.008 152.001 M 319.952 177.148 C 319.952 180.487 319.952 183.826 319.952 187.164 C 314.172 187.165 308.393 187.165 302.613 187.164 C 302.613 192.706 302.613 198.247 302.613 203.787 C 309.396 203.787 316.179 203.787 322.962 203.787 C 322.962 207.212 322.962 210.635 322.962 214.059 C 313.169 214.059 303.376 214.059 293.583 214.059 C 293.583 193.373 293.583 172.687 293.583 152.001 C 303.356 152.001 313.129 152.001 322.902 152.001 C 322.902 155.454 322.902 158.906 322.902 162.358 C 316.139 162.359 309.376 162.359 302.613 162.358 C 302.613 167.289 302.613 172.219 302.613 177.148 C 308.393 177.148 314.172 177.148 319.952 177.148 M 278.622 193.387 C 281.632 193.388 284.642 193.388 287.653 193.387 C 287.312 200.065 285.566 205.322 282.415 209.158 C 279.284 212.994 275.150 214.912 270.013 214.912 C 264.394 214.912 259.969 212.241 256.738 206.899 C 253.527 201.528 251.921 194.169 251.921 184.820 C 251.921 183.556 251.921 182.292 251.921 181.027 C 251.921 175.060 252.664 169.803 254.149 165.256 C 255.634 160.710 257.751 157.229 260.501 154.814 C 263.270 152.370 266.481 151.148 270.133 151.148 C 275.190 151.148 279.264 153.066 282.355 156.902 C 285.445 160.738 287.231 166.123 287.713 173.056 C 284.702 173.057 281.692 173.057 278.682 173.056 C 278.462 169.050 277.669 166.151 276.304 164.361 C 274.960 162.543 272.903 161.633 270.133 161.633 C 267.123 161.633 264.865 163.168 263.360 166.237 C 261.875 169.277 261.113 174.008 261.073 180.430 C 261.072 181.993 261.072 183.556 261.073 185.119 C 261.073 191.825 261.785 196.726 263.210 199.823 C 264.655 202.921 266.922 204.469 270.013 204.469 C 272.802 204.469 274.879 203.574 276.244 201.784 C 277.629 199.966 278.421 197.167 278.622 193.387 M 222.933 162.358 C 222.933 167.573 222.933 172.787 222.933 178.001 C 225.161 178.001 227.388 178.001 229.616 178.001 C 234.171 177.887 236.449 175.315 236.449 170.286 C 236.449 167.473 235.867 165.455 234.703 164.233 C 233.559 162.983 231.743 162.358 229.255 162.358 C 227.147 162.359 225.040 162.359 222.933 162.358 M 231.211 187.037 C 228.452 187.037 225.692 187.037 222.933 187.037 C 222.933 192.620 222.933 198.204 222.933 203.787 C 225.512 203.787 228.090 203.787 230.669 203.787 C 232.797 203.787 234.452 203.077 235.636 201.656 C 236.840 200.207 237.442 198.218 237.442 195.689 C 237.442 190.006 235.365 187.122 231.211 187.037 M 230.940 214.059 C 225.261 214.059 219.582 214.059 213.902 214.059 C 213.902 193.373 213.902 172.687 213.902 152.001 C 219.020 152.001 224.137 152.001 229.255 152.001 C 234.573 152.001 238.606 153.450 241.356 156.348 C 244.105 159.218 245.480 163.438 245.480 169.007 C 245.480 172.048 244.928 174.733 243.824 177.063 C 242.720 179.365 241.185 181.055 239.218 182.135 C 241.466 182.931 243.232 184.536 244.516 186.951 C 245.821 189.367 246.473 192.322 246.473 195.817 C 246.473 201.784 245.128 206.302 242.439 209.371 C 239.750 212.440 235.917 214.003 230.940 214.059 M 176.425 184.692 C 173.957 184.693 171.488 184.693 169.020 184.692 C 169.020 191.058 169.020 197.423 169.020 203.787 C 171.418 203.787 173.816 203.787 176.215 203.787 C 178.522 203.787 180.359 202.892 181.723 201.102 C 183.108 199.312 183.800 196.911 183.800 193.899 C 183.800 191.086 183.138 188.869 181.814 187.250 C 180.509 185.602 178.713 184.749 176.425 184.692 M 169.020 152.001 C 169.020 159.460 169.020 166.919 169.020 174.378 C 171.368 174.378 173.716 174.378 176.064 174.378 C 181.222 174.378 185.305 176.154 188.316 179.706 C 191.346 183.229 192.861 187.989 192.861 193.984 C 192.861 200.008 191.356 204.853 188.346 208.519 C 185.356 212.156 181.372 214.003 176.395 214.059 C 170.906 214.059 165.418 214.059 159.929 214.059 C 159.929 193.373 159.929 172.687 159.929 152.001 C 162.960 152.001 165.990 152.001 169.020 152.001 M 154.842 152.001 C 154.842 155.454 154.842 158.906 154.842 162.358 C 150.367 162.359 145.892 162.359 141.417 162.358 C 141.416 179.592 141.416 196.826 141.417 214.059 C 138.406 214.059 135.396 214.059 132.386 214.059 C 132.386 196.826 132.386 179.592 132.386 162.358 C 127.971 162.359 123.556 162.359 119.141 162.358 C 119.141 158.906 119.141 155.454 119.141 152.001 C 131.041 152.001 142.942 152.001 154.842 152.001 M 97.166 167.686 C 95.350 175.429 93.534 183.172 91.718 190.915 C 95.370 190.916 99.023 190.916 102.675 190.915 C 100.839 183.172 99.003 175.429 97.166 167.686 M 108.154 214.059 C 107.140 209.797 106.127 205.535 105.113 201.273 C 99.835 201.273 94.557 201.273 89.280 201.273 C 88.276 205.535 87.273 209.797 86.270 214.059 C 83.069 214.059 79.868 214.059 76.667 214.059 C 82.105 193.373 87.544 172.687 92.982 152.001 C 95.772 152.001 98.561 152.001 101.351 152.001 C 106.819 172.687 112.287 193.373 117.756 214.059 C 114.555 214.059 111.354 214.059 108.154 214.059 M 26.366 152.001 C 30.300 152.001 34.233 152.001 38.166 152.001 C 41.919 167.004 45.672 182.007 49.425 197.010 C 53.157 182.007 56.890 167.004 60.623 152.001 C 64.576 152.001 68.529 152.001 72.483 152.001 C 72.482 172.687 72.482 193.373 72.483 214.059 C 69.462 214.059 66.442 214.059 63.422 214.059 C 63.422 208.405 63.422 202.750 63.422 197.096 C 63.723 187.335 64.024 177.575 64.325 167.814 C 60.381 183.229 56.438 198.644 52.495 214.059 C 50.428 214.059 48.361 214.059 46.294 214.059 C 42.360 198.659 38.427 183.258 34.494 167.856 C 34.795 177.603 35.096 187.349 35.397 197.096 C 35.397 202.750 35.397 208.405 35.397 214.059 C 32.387 214.059 29.376 214.059 26.366 214.059 C 26.366 193.373 26.366 172.687 26.366 152.001 "
            />
            <path
              id="line-1"
              fill="none"
              stroke="#202020"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 398.459 83.388 C 400.197 83.388 401.936 83.388 403.675 83.388 C 402.902 73.452 402.129 61.186 401.357 46.589 C 399.811 63.353 398.845 75.620 398.459 83.388 M 389.692 26.969 C 397.046 26.970 404.399 26.970 411.753 26.969 C 414.663 56.218 417.573 85.466 420.484 114.714 C 415.279 114.714 410.075 114.714 404.871 114.714 C 404.617 109.457 404.363 104.200 404.110 98.942 C 402.286 98.942 400.463 98.942 398.640 98.942 C 398.338 104.200 398.036 109.457 397.734 114.714 C 392.469 114.714 387.204 114.714 381.940 114.714 C 384.524 85.466 387.108 56.218 389.692 26.969 M 364.044 26.969 C 369.127 26.970 374.211 26.970 379.295 26.969 C 379.295 56.218 379.295 85.466 379.295 114.714 C 374.211 114.714 369.127 114.714 364.044 114.714 C 364.044 102.429 364.044 90.145 364.044 77.860 C 362.522 77.860 361.001 77.860 359.479 77.860 C 359.479 90.145 359.479 102.429 359.479 114.714 C 354.396 114.714 349.312 114.714 344.228 114.714 C 344.228 85.466 344.228 56.218 344.228 26.969 C 349.312 26.970 354.396 26.970 359.479 26.969 C 359.479 37.430 359.479 47.890 359.479 58.349 C 361.001 58.350 362.522 58.350 364.044 58.349 C 364.044 47.890 364.044 37.430 364.044 26.969 M 338.142 26.915 C 338.142 56.182 338.142 85.448 338.142 114.714 C 333.892 114.714 329.641 114.714 325.391 114.714 C 325.391 101.400 325.391 88.085 325.391 74.771 C 322.746 88.085 320.102 101.400 317.457 114.714 C 313.001 114.714 308.546 114.714 304.090 114.714 C 304.090 85.448 304.090 56.182 304.090 26.915 C 308.340 26.916 312.591 26.916 316.842 26.915 C 316.841 40.122 316.841 53.328 316.842 66.533 C 319.691 53.328 322.541 40.122 325.391 26.915 C 329.641 26.916 333.892 26.916 338.142 26.915 M 298.004 26.915 C 298.004 56.182 298.004 85.448 298.004 114.714 C 292.908 114.714 287.812 114.714 282.717 114.714 C 282.717 91.301 282.717 67.888 282.717 44.475 C 281.231 44.476 279.746 44.476 278.261 44.475 C 278.261 61.042 278.261 77.607 278.261 94.173 C 278.261 100.713 277.693 105.410 276.558 108.264 C 275.447 111.118 273.745 112.907 271.450 113.630 C 269.156 114.352 265.497 114.714 260.474 114.714 C 259.677 114.714 258.880 114.714 258.083 114.714 C 258.083 109.673 258.083 104.633 258.083 99.593 C 259.943 99.593 261.223 99.250 261.923 98.563 C 262.623 97.877 262.974 95.528 262.974 91.518 C 262.974 69.984 262.974 48.450 262.974 26.915 C 274.650 26.916 286.327 26.916 298.004 26.915 M 254.678 26.915 C 254.678 56.182 254.678 85.448 254.678 114.714 C 249.582 114.714 244.486 114.714 239.391 114.714 C 239.390 91.301 239.390 67.888 239.391 44.475 C 237.881 44.476 236.372 44.476 234.862 44.475 C 234.862 67.888 234.862 91.301 234.862 114.714 C 229.767 114.714 224.671 114.714 219.575 114.714 C 219.575 85.448 219.575 56.182 219.575 26.915 C 231.276 26.916 242.977 26.916 254.678 26.915 M 213.489 26.915 C 213.489 56.182 213.489 85.448 213.489 114.714 C 209.238 114.714 204.988 114.714 200.738 114.714 C 200.737 101.400 200.737 88.085 200.738 74.771 C 198.093 88.085 195.448 101.400 192.804 114.714 C 188.348 114.714 183.892 114.714 179.437 114.714 C 179.437 85.448 179.437 56.182 179.437 26.915 C 183.687 26.916 187.938 26.916 192.188 26.915 C 192.188 40.122 192.188 53.328 192.188 66.533 C 195.038 53.328 197.888 40.122 200.738 26.915 C 204.988 26.916 209.238 26.916 213.489 26.915 M 175.379 97.154 C 175.379 108.047 175.379 118.941 175.379 129.834 C 171.865 129.834 168.351 129.834 164.838 129.834 C 164.837 124.794 164.837 119.754 164.838 114.714 C 155.612 114.714 146.387 114.714 137.161 114.714 C 137.161 85.448 137.161 56.182 137.161 26.915 C 142.257 26.916 147.352 26.916 152.448 26.915 C 152.448 50.329 152.448 73.741 152.448 97.154 C 153.958 97.154 155.467 97.154 156.977 97.154 C 156.977 73.741 156.977 50.329 156.977 26.915 C 162.072 26.916 167.168 26.916 172.264 26.915 C 172.264 50.329 172.264 73.741 172.264 97.154 C 173.302 97.154 174.341 97.154 175.379 97.154 M 131.691 56.886 C 131.691 59.668 131.691 62.451 131.691 65.232 C 126.607 65.233 121.523 65.233 116.440 65.232 C 116.440 60.138 116.440 55.044 116.440 49.949 C 116.440 45.505 116.271 42.741 115.933 41.657 C 115.619 40.537 114.906 39.976 113.795 39.977 C 112.540 39.977 111.743 40.645 111.405 41.982 C 111.066 43.319 110.897 46.209 110.897 50.653 C 110.897 64.239 110.897 77.824 110.897 91.409 C 110.897 95.673 111.066 98.455 111.405 99.755 C 111.743 101.056 112.503 101.706 113.687 101.706 C 114.822 101.706 115.558 101.056 115.897 99.755 C 116.259 98.455 116.440 95.401 116.440 90.596 C 116.440 86.929 116.440 83.262 116.440 79.594 C 121.523 79.595 126.607 79.595 131.691 79.594 C 131.691 80.733 131.691 81.871 131.691 83.009 C 131.691 92.077 131.256 98.509 130.387 102.303 C 129.542 106.096 127.646 109.420 124.699 112.275 C 121.777 115.129 118.167 116.556 113.868 116.556 C 109.400 116.556 105.717 115.346 102.819 112.925 C 99.921 110.504 98.001 107.162 97.059 102.899 C 96.117 98.599 95.646 92.150 95.646 83.551 C 95.646 75.006 95.646 66.461 95.646 57.916 C 95.646 51.593 95.791 46.859 96.081 43.716 C 96.371 40.537 97.228 37.483 98.653 34.557 C 100.102 31.630 102.094 29.336 104.630 27.674 C 107.190 25.976 110.125 25.127 113.433 25.127 C 117.925 25.127 121.632 26.427 124.554 29.029 C 127.477 31.630 129.397 34.882 130.314 38.784 C 131.232 42.650 131.691 48.684 131.691 56.886 M 89.995 26.915 C 89.995 56.182 89.995 85.448 89.995 114.714 C 85.744 114.714 81.494 114.714 77.243 114.714 C 77.243 101.400 77.243 88.085 77.243 74.771 C 74.599 88.085 71.954 101.400 69.310 114.714 C 64.854 114.714 60.398 114.714 55.943 114.714 C 55.943 85.448 55.943 56.182 55.943 26.915 C 60.193 26.916 64.444 26.916 68.694 26.915 C 68.694 40.122 68.694 53.328 68.694 66.533 C 71.544 53.328 74.393 40.122 77.243 26.915 C 81.494 26.916 85.744 26.916 89.995 26.915 M 24.644 96.287 C 27.360 96.287 30.077 96.287 32.794 96.287 C 32.794 78.944 32.794 61.601 32.794 44.258 C 31.285 44.259 29.775 44.259 28.266 44.258 C 28.266 44.476 28.266 44.692 28.266 44.909 C 28.266 61.709 27.059 78.835 24.644 96.287 M 51.197 96.287 C 51.197 107.469 51.197 118.652 51.197 129.834 C 47.683 129.834 44.169 129.834 40.655 129.834 C 40.655 124.794 40.655 119.754 40.655 114.714 C 32.444 114.714 24.233 114.714 16.022 114.714 C 16.022 119.754 16.022 124.794 16.022 129.834 C 12.520 129.834 9.018 129.834 5.516 129.834 C 5.516 118.688 5.516 107.542 5.516 96.395 C 6.555 96.395 7.593 96.395 8.632 96.395 C 10.274 89.205 11.614 79.757 12.653 68.050 C 13.715 56.308 14.247 43.481 14.247 29.571 C 14.247 28.686 14.247 27.801 14.247 26.915 C 25.525 26.916 36.803 26.916 48.082 26.915 C 48.081 50.040 48.081 73.163 48.082 96.287 C 49.120 96.287 50.158 96.287 51.197 96.287 "
            />
          </g>
        </svg>
      </div>
      <div className="mt-10" id="endCheck"></div>
    </section>
  );
}

export default FraseSvgComponent;
