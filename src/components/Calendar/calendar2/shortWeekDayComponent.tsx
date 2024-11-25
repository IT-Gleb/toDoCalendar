import { shortDaysOfWeek } from "@/utils/data";

import React, { memo } from "react";

export const ShortWeekDayComponent = memo(() => {
  return (
    <div className="flex gap-x-[13px] text-[0.8rem] text-black/50 font-bold uppercase border-b">
      {shortDaysOfWeek.map((item, index) => {
        return (
          <div
            className={`px-3 py-2 text-center
              ${index === 0 ? "w-[28px] h-[28px]" : "w-[34px] h-[28px]"}
            `}
            key={index}
          >
            {index === 0 ? null : item}
          </div>
        );
      })}
    </div>
  );
});
