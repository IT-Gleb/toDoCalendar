"use client";

import { useDateSelect } from "@/store/dateStore";
import {
  EqualDateNow,
  NumberFromString,
  StrDateFromNumbers,
  ZeroToNumber,
} from "@/utils/functions";
import { DaySelect_SVG } from "@/utils/svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { motion } from "framer-motion";

export const CalendarItemComponent = memo(
  ({ paramDay }: { paramDay: TCData }) => {
    const [itemHref, setItemHref] = useState<string>("");
    const setCurrentDate = useDateSelect(
      useShallow((state) => state.setCurrentDate)
    );
    const Router = useRouter();
    const [currDay] = useState<string | undefined>(
      ZeroToNumber(paramDay.day as number) as string
    );
    const [today] = useState<boolean>(
      EqualDateNow(
        StrDateFromNumbers(
          paramDay.year as number,
          paramDay.mounth as number,
          paramDay.day as number
        )
      )
    );

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (paramDay.id) {
        const dt: number = NumberFromString(paramDay, false) as number;
        setCurrentDate(dt);
        Router.push(itemHref, { scroll: false });
      }
    };

    useEffect(() => {
      if (paramDay.id) {
        const tmpStr: string = ("/tasks/" +
          NumberFromString(paramDay, true)) as string;
        setItemHref(tmpStr);
      }
    }, [paramDay]);

    if (!paramDay.id) {
      return (
        <div className=" w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] bg-slate-100 rounded-full "></div>
      );
    }

    if (paramDay.id && !paramDay.enabled && paramDay.isSelected) {
      return (
        <Link
          href={""}
          onClick={handleClick}
          title={paramDay.day + "-" + paramDay.mounth_str + "-" + paramDay.year}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`px-1 py-1 lg:py-[3px] w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] transition-all relative ${
              paramDay.isSelected
                ? "text-slate-100 hover:text-white hover:outline-slate-600 "
                : " text-slate-200 "
            } bg-slate-500 text-[0.7rem] lg:text-[1rem] rounded-full outline outline-[1px] outline-slate-400 outline-offset-2 border border-slate-300  font-sans hover:outline-2`}
          >
            {currDay}
            {paramDay.isSelected && (
              <div className="w-fit absolute left-[14px] lg:left-[18px] bottom-0 text-slate-200 z-10 drop-shadow-[-1px_2px_0_rgba(0,0,0,1)] ">
                <DaySelect_SVG pWidth={18} pHeight={18} />
              </div>
            )}
          </motion.div>
        </Link>
      );
    } else if (paramDay.id && !paramDay.enabled && !paramDay.isSelected) {
      return (
        <div className="w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] bg-slate-300 rounded-full text-slate-50 text-[0.7rem] lg:text-[0.95rem] uppercase text-center p-[6px]">
          {currDay}
        </div>
      );
    }

    return (
      <Link
        href={""}
        onClick={handleClick}
        scroll={false}
        title={paramDay.day + "-" + paramDay.mounth_str + "-" + paramDay.year}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`px-1 py-1 lg:py-[3px] w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] transition-all relative ${
            paramDay.isSelected
              ? ` ${
                  today ? "bg-sky-300 text-black" : "bg-green-50 text-slate-600"
                } hover:text-yellow-700 hover:outline-sky-800 `
              : ` ${
                  today ? "bg-sky-300 text-black" : "bg-white text-slate-400"
                } hover:text-black hover:outline-sky-600 hover:border-sky-100`
          } text-[0.7rem] lg:text-[1rem] rounded-full outline outline-[1px] outline-sky-400 outline-offset-2 border border-sky-300  font-sans hover:outline-2`}
        >
          {currDay}
          {paramDay.isSelected && (
            <div className="w-fit absolute left-[14px] lg:left-[18px] bottom-0 text-green-300 z-10 drop-shadow-[-1px_2px_0_rgba(15,25,160,1)]">
              <DaySelect_SVG pWidth={18} pHeight={18} />
            </div>
          )}
        </motion.div>
      </Link>
    );
  }
);
