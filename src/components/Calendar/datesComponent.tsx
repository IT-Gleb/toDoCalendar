"use client";
import { useDateSelect } from "@/store/dateStore";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const DatesComponent = () => {
  const setOptions = useDateSelect(useShallow((state) => state.setYearMonths));
  const currentDate = useDateSelect(useShallow((state) => state.current_date));
  const monthOptions = useDateSelect(useShallow((state) => state.yearDates));
  const setCurrentDate = useDateSelect(
    useShallow((state) => state.setCurrentDate)
  );
  const [dateOpt, setDateOpt] = useState<number>(currentDate);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log(event.currentTarget.value);
    let tmp = event.currentTarget.value;
    setDateOpt(Number(tmp));
    setCurrentDate(Number(tmp));
    // console.log(monthOptions);
  };

  useEffect(() => {
    setOptions(currentDate);
  }, []);

  return (
    <select
      name="dates"
      id="datesId"
      value={dateOpt}
      onChange={handleChange}
      className="max-w-[150px] p-1 outline-none border text-[0.8rem] bg-white"
    >
      {monthOptions.length &&
        monthOptions.map((item, index) => {
          return (
            <option
              key={index + Math.random() * 10}
              value={item.data}
              className="bg-white odd:bg-slate-100 p-1 "
            >
              {item.title}
            </option>
          );
        })}
    </select>
  );
};
