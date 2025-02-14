import { useMediaQuery } from "@/hooks/checkDevice";
import Image from "next/image";
import React, { memo } from "react";

export const ImageItem = memo(
  ({ srcImage, nameImage }: { srcImage: string; nameImage: string }) => {
    const isMobile = useMediaQuery("only screen and (max-width: 768px)");
    const isPocked = useMediaQuery(
      "only screen and (min-width: 769px) and (max-width: 1024px)"
    );

    //console.log(isPlanshet);

    return (
      <div className="p-1 text-center">
        <div
          className="aspect-video object-fill object-center overflow-hidden"
          style={{
            width: isMobile ? 320 : isPocked ? 280 : 220,
            height: isMobile ? 180 : isPocked ? 160 : 140,
          }}
        >
          <Image
            src={srcImage}
            alt={`Изображение-${nameImage}`}
            width={isMobile ? 320 : isPocked ? 280 : 220}
            height={isMobile ? 180 : isPocked ? 160 : 140}
            quality={isMobile ? 75 : 50}
            priority
            style={{ width: "auto", height: "auto" }}
          />
          {/* <img
            src={srcImage}
            alt={`Изображение - ${nameImage}`}
            loading="lazy"
          /> */}
        </div>
        <span className="text-[clamp(0.55rem,0.7rem,0.85rem)]/[clamp(0.55rem,0.7rem,0.85rem)]">
          {nameImage}
        </span>
      </div>
    );
  }
);
