import { shortDaysOfWeek } from "@/utils/data";

import React, { memo } from "react";

export const ShortWeekDayComponent = memo(() => {
  return (
    <div className="flex gap-x-3 text-[0.7rem] text-black/50 font-bold uppercase border-b">
      {shortDaysOfWeek.map((item, index) => {
        return (
          <div
            className={
              index === 0
                ? `w-[28px] h-[28px] px-3 py-2 text-center`
                : `w-[34px] h-[28px] px-3 py-2 text-center`
            }
            key={index}
          >
            {index === 0 ? null : item}
          </div>
        );
      })}
    </div>
  );
});
