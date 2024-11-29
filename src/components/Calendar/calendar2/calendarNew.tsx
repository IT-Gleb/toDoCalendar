"use client";
import React, { memo, useEffect, useState } from "react";
import { ShortWeekDayComponent } from "./shortWeekDayComponent";
import { CalendarItemComponent } from "./calendarItemComponent";
import {
  DaysInYear,
  DaysToEndOfYear,
  LastDidgitInNumber,
} from "@/utils/functions";

export const CalendarNew = memo(
  ({ paramMonth }: { paramMonth: TMonthObject }) => {
    const [strTitle, setStrTitle] = useState<string>("");
    const [strYear, setStrYear] = useState<string>("2025");
    const [DayEndYear] = useState<number>(DaysToEndOfYear());
    const [DaysInYear_var] = useState(DaysInYear());
    const [lastDidgit] = useState<number>(LastDidgitInNumber(DayEndYear));

    useEffect(() => {
      for (const key of Object.keys(paramMonth)) {
        if (paramMonth[key] !== undefined) {
          const last = paramMonth[key].length - 1;
          setStrTitle(
            ((paramMonth[key][last].mounth_str as string) +
              " " +
              paramMonth[key][last].year) as string
          );
          setStrYear(paramMonth[key][last].year as unknown as string);
          break;
        }
      }
    }, [paramMonth]);

    return (
      <section className="w-fit mx-auto p-3 overflow-hidden">
        <div
          title={strTitle}
          className=" pt-4 pb-0 border border-slate-400 shadow-md shadow-slate-500 relative before:content-[attr(title)] before:bg-white before:border before:border-slate-300 before:rounded-md before:text-slate-700 before:text-[1.2rem] before:uppercase before:font-bold before:px-2 before:absolute before:right-10 before:-top-3"
        >
          {/* Заголовок */}
          <ShortWeekDayComponent />
          {Object.keys(paramMonth).map((item, index) => {
            const tmp = paramMonth[item];
            return (
              <div className="px-2 mt-3 flex items-center gap-x-3" key={index}>
                <div
                  key={item + Math.random() * 100}
                  className={`w-[28px] h-[28px] px-2 py-2 bg-slate-50 text-slate-500 text-[0.7rem] text-center font-semibold`}
                >
                  {item}
                </div>
                {tmp &&
                  tmp.length &&
                  tmp.map((tmpItem, index) => (
                    <CalendarItemComponent key={index} paramDay={tmpItem} />
                  ))}
              </div>
            );
          })}
          <div className="relative w-full mt-4 bg-sky-500 text-slate-50 text-[0.6rem] p-1 text-center flex justify-evenly">
            <div className=" absolute w-fit left-[44%] -top-1 translate-y-[-44%] font-bold text-[1.6rem]">
              {/* <span className="bg-clip-text text-transparent bg-[linear-gradient(to_bottom,theme(colors.sky.800),theme(colors.sky.200),theme(colors.yellow.300))]">
                {strYear}
              </span> */}
              <span className="font-stroke-1 text-yellow-50 font-bold">
                {strYear}
              </span>
            </div>
            <span>
              Дней в году:{" "}
              <span className="text-yellow-100 text-[1rem] font-bold font-mono">
                {DaysInYear_var}
              </span>
            </span>
            <span>
              Дней года прошло:{" "}
              <span className="text-yellow-100 text-[1rem] font-bold font-mono">
                {DaysInYear_var - DayEndYear}
              </span>
            </span>
            <span>
              {`До конца года ${
                lastDidgit === 0 || lastDidgit > 4
                  ? "дней"
                  : lastDidgit === 1
                  ? "день"
                  : "дня"
              } : `}
              <span className="text-yellow-100 text-[1rem] font-bold font-mono">
                {DayEndYear}
              </span>
            </span>
          </div>
          {/* //Footer Calendar */}
        </div>
      </section>
    );
  }
);
