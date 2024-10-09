"use client";
import { Selected_SVG } from "@/utils/svg-icons";
import Link from "next/link";
import React, { useState } from "react";

export const CalendarItem = ({ paramItem }: { paramItem: TCData }) => {
  const [hasItem] = useState<boolean>(paramItem.id !== undefined);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSel, setIsSel] = useState<boolean>(paramItem.isSelected as boolean);
  const [itemHref] = useState<string>(
    `${paramItem.year}-${
      paramItem.mounth && paramItem.mounth < 10
        ? "0" + paramItem.mounth
        : paramItem.mounth
    }-${
      paramItem.day && paramItem.day < 10 ? "0" + paramItem.day : paramItem.day
    }`
  );

  const handleSelected = () => {
    paramItem.isSelected = !paramItem.isSelected;
    setIsSel(paramItem.isSelected as boolean);
  };

  if (!hasItem) return <div className="w-[120px] h-[120px] bg-slate-100"></div>;

  return (
    hasItem && (
      <Link href={`/${itemHref}`} scroll={false}>
        <article
          className={`w-[120px] h-[120px] overflow-hidden ${
            isSel
              ? "outline outline-2 outline-offset-[3px] outline-sky-500 bg-sky-100"
              : "outline-none bg-white"
          } flex flex-col gap-y-1 border transition-all ${
            isActive ? "border-black" : "border-black/15"
          } rounded-sm cursor-pointer hover:-translate-y-1 hover:shadow-lg`}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          onClick={handleSelected}
        >
          <div
            className={`text-[0.75rem] p-1 ${
              isSel ? "bg-sky-600 text-white" : "bg-slate-200"
            } `}
          >
            {paramItem.weekDay}
          </div>
          <div
            className={`flex-auto text-[2rem] font-bold ${
              isActive ? "text-black" : "text-stone-300"
            } `}
          >
            <div
              className={`w-fit mx-auto flex flex-col items-start ${
                isSel ? "text-sky-700" : ""
              }`}
            >
              <div className="w-full flex items-center justify-center gap-x-2 ">
                {paramItem.day && paramItem.day < 10
                  ? "0" + paramItem.day
                  : paramItem.day}
                {isSel && <Selected_SVG pWidth={32} pHeight={32} />}
              </div>
              <span className="w-fit mx-auto text-[0.6rem] text-black/40 font-bold">
                {paramItem.year}
              </span>
            </div>
          </div>
          <div
            className={`text-center text-[0.7rem] ${
              isSel ? "bg-sky-600 text-white" : "bg-slate-100 text-black"
            }  p-[2px]`}
          >
            {paramItem.mounth_str}
          </div>
        </article>
      </Link>
    )
  );
};
