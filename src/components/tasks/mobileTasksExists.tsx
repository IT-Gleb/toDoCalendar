"use client";
import {
  ChangeDateItems,
  MyPipeStr,
  returnStrPartOne,
  returnStrPartTwo,
  TimeZoneDateToString,
} from "@/utils/functions";
import React, { memo } from "react";
import Link from "next/link";

const MobileTaskTblTop = memo(function MobileTaskTblTop({
  paramWorkDate,
}: {
  paramWorkDate: string;
}): React.JSX.Element {
  return (
    <div className="sm:hidden sticky left-0 z-[2] grid grid-cols-[25px_60px] auto-rows-[35px] bg-sky-600 uppercase text-slate-200">
      <div className=" row-span-4 text-slate-100 vertical-text text-center text-[clamp(0.55rem,0.65rem,0.75rem)] font-bold py-2 px-1 bg-sky-400 tracking-[0.09em] scale-x-180">
        Запланированные
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold ">
        N/N
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold">
        Наимен...
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold">
        Старт
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold">
        Финиш
      </div>
    </div>
  );
});

export const MobileTasksExists = memo(
  ({
    paramWorkDate,
    paramTasks,
  }: {
    paramWorkDate: string;
    paramTasks: TTaskList;
  }) => {
    return (
      <div className="sm:hidden flex items-start w-[350px] mx-auto overflow-y-hidden overflow-x-auto">
        <MobileTaskTblTop paramWorkDate={paramWorkDate} />

        {paramTasks.map((item, index) => {
          //Сформировать дату и время
          let b_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartOne
          )(item.begin_at as unknown as string);

          let t_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartTwo
          )(item.begin_at as unknown as string);

          let e_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartOne
          )(item.end_at as unknown as string);
          // TimeZoneDateToString(item.end_at as unknown as string).split(" ")[0];
          let et_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartTwo
          )(item.end_at as unknown as string);

          //Через группу
          const odd: boolean = index % 2 === 0;

          //Сформировать ссылку
          let aHref: string =
            "/tasks/" +
            MyPipeStr(
              TimeZoneDateToString,
              returnStrPartOne,
              ChangeDateItems
            )(item.begin_at as unknown as string);

          return (
            <div
              className={`grid grid-cols-[100px] auto-rows-[35px] text-[0.7rem] border-b-4 border-b-transparent ${
                !odd ? "bg-sky-100" : "bg-slate-50"
              }`}
              key={item.id}
            >
              <div className="overflow-hidden p-1 text-center align-middle">
                {index + 1}.
              </div>
              <div className="overflow-hidden p-1 align-middle hover:underline">
                <Link href={aHref} scroll={false}>
                  {item.name}
                </Link>
              </div>
              <div className="overflow-hidden p-1 align-middle text-[0.6rem]">
                {b_date}{" "}
                <span className="text-[0.7rem] text-blue-900 font-bold">
                  {t_date}
                </span>
              </div>
              <div className="overflow-hidden text-[0.6rem] p-1 align-middle border-b-2 border-b-transparent">
                {e_date}{" "}
                <span className="text-[0.7rem] text-blue-900 font-bold">
                  {et_date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default MobileTasksExists;
