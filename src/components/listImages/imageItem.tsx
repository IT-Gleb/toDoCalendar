"use client";

import { useMediaQuery } from "@/hooks/checkDevice";
import Image from "next/image";
import React, { memo } from "react";

const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `http://localhost:3010/${src}?w=${width}&q=${quality || 50}`;
};

export const ImageItem = memo(
  ({
    srcImage,
    Img,
  }: {
    srcImage: string;
    Img: { name: string; url: string };
  }) => {
    const isMobile = useMediaQuery("only screen and (max-width: 768px)");
    const isPocked = useMediaQuery(
      "only screen and (min-width: 769px) and (max-width: 1024px)"
    );

    return (
      <div className="p-1 text-center">
        <div
          className="aspect-video object-fill object-center overflow-hidden"
          style={{
            width: isMobile ? 320 : isPocked ? 280 : 220,
            height: isMobile ? 180 : isPocked ? 160 : 140,
          }}
        >
          {/* <Image
            src={Img.url}
            alt={`Изображение-${Img.name}`}
            width={isMobile ? 320 : isPocked ? 280 : 220}
            height={isMobile ? 180 : isPocked ? 160 : 140}
            quality={isMobile ? 75 : 50}
            priority
            style={{ width: "auto", height: "auto" }}
          /> */}

          <img src={Img.url} alt={`Изображение - ${Img.name}`} loading="lazy" />
        </div>
        <span className="text-[clamp(0.55rem,0.7rem,0.85rem)]/[clamp(0.55rem,0.7rem,0.85rem)]">
          {Img.name}
        </span>
      </div>
    );
  }
);
