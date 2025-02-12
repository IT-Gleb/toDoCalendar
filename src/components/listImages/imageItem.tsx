import { useMediaQuery } from "@/hooks/checkDevice";
import Image from "next/image";
import React, { memo } from "react";

export const ImageItem = memo(
  ({ srcImage, nameImage }: { srcImage: string; nameImage: string }) => {
    const isMobile = useMediaQuery("only screen and (max-width: 767px)");
    const isPlanshet = useMediaQuery(
      "only screen and (min-width: 768px) and (max-width: 1023px)"
    );

    //console.log(isPlanshet);

    return (
      <div className="p-1 text-center">
        <div
          className="aspect-video object-fill object-center overflow-hidden"
          style={{
            width: isMobile ? 320 : isPlanshet ? 280 : 220,
            height: isMobile ? 180 : isPlanshet ? 160 : 140,
          }}
        >
          <Image
            src={srcImage}
            alt={`Изображение-${nameImage}`}
            width={isMobile ? 320 : isPlanshet ? 280 : 220}
            height={isMobile ? 180 : isPlanshet ? 160 : 140}
            quality={isMobile ? 75 : 50}
          />
        </div>
        <span className="text-[clamp(0.55rem,0.7rem,0.85rem)]/[clamp(0.55rem,0.7rem,0.85rem)]">
          {nameImage}
        </span>
      </div>
    );
  }
);
