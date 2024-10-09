"use client";
import React from "react";
import { getMounthData } from "@/utils/functions";
import { CalendarItem } from "./calendarItem";
import { DatesComponent } from "./datesComponent";
import { useDateSelect } from "@/store/dateStore";
import { useShallow } from "zustand/shallow";

export const CalendarComponent = () => {
  const currentDate = useDateSelect(useShallow((state) => state.current_date));
  const data = getMounthData(currentDate);

  return (
    <div className="w-full mx-auto flex flex-col gap-y-3 px-2 items-center justify-center py-4">
      <div className="w-fit mx-auto">
        <DatesComponent />
      </div>
      <div className="w-[95%] h-auto lg:w-[1000px] overflow-y-auto overflow-x-auto mt-2 mx-auto p-2 scroller grid grid-cols-[120px_120px_120px_120px_120px_120px_120px] gap-x-3 gap-y-3">
        {data &&
          data.length > 0 &&
          data.map((item: TCData, index) => (
            <CalendarItem key={item.id ? item.id : index} paramItem={item} />
          ))}
      </div>
    </div>
  );
};
