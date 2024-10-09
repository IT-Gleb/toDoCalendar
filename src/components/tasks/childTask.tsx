import {
  StrTimeFromOneNumber,
  StrFullDateTimeFromNumbers,
} from "@/utils/functions";
import { Selected_SVG } from "@/utils/svg-icons";
import React from "react";

export const ChildTask = ({ paramItem }: { paramItem: Partial<TTask> }) => {
  return (
    <div
      className={` overflow-hidden w-full flex flex-col space-y-2 rounded-b-xl border ${
        paramItem.completed ? "border-green-500" : "border-slate-700"
      }`}
    >
      <div
        className={`p-1 ${
          paramItem.completed ? "bg-green-600" : "bg-slate-600"
        } text-white text-[0.7rem]`}
      >
        <span>{paramItem.name}</span>
        <div className=" px-2 pt-1 whitespace-nowrap border-t border-t-white text-center text-[0.55rem]">
          {StrTimeFromOneNumber(paramItem.begin_at as number) +
            "-" +
            StrTimeFromOneNumber(paramItem.end_at as number)}
        </div>
      </div>
      <div className="p-1 flex flex-col">
        <span className=" font-bold text-[0.65rem] uppercase">Начало:</span>
        <span className="ml-auto text-[0.85rem] font-bold text-sky-500">
          {StrFullDateTimeFromNumbers(paramItem.begin_at as number)}
        </span>
        <span className=" font-bold text-[0.65rem] uppercase">
          Заканчивается:
        </span>
        <span className="ml-auto text-[0.85rem] font-bold text-sky-600">
          {StrFullDateTimeFromNumbers(paramItem.end_at as number)}
        </span>
        <span className=" font-bold text-[0.65rem] uppercase">Статус:</span>
        <span
          className={`ml-auto text-[0.8rem] ${
            paramItem.completed ? "text-green-400" : "text-rose-400"
          }`}
        >
          {paramItem.completed ? (
            <Selected_SVG pWidth={36} pHeight={36} />
          ) : (
            "Не завершена"
          )}
        </span>
      </div>
      <div></div>
    </div>
  );
};
