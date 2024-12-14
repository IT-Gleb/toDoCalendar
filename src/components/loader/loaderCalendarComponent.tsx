import React from "react";
import Loader from "./loaderComp";

export const LoaderCalendarComponent = () => {
  return (
    <div className="w-[360px] mx-auto flex flex-col animate-pulse relative">
      <div className="w-[100px] h-[100px] text-slate-600 z-[2] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Loader />
      </div>
      <div className="flex flex-col space-y-1 ">
        <div className="w-[50%] h-[24px] place-self-end bg-slate-300 rounded-sm"></div>
        <div className="w-[90%] h-[30px] place-self-end bg-slate-300 rounded-md"></div>
      </div>
      <div className="w-full flex items-center justify-between gap-x-2 space-y-2">
        <div className="bg-slate-300 w-[28px] h-[28px] rounded-md"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
      </div>
      <div className="w-full flex items-center justify-between gap-x-2 space-y-2">
        <div className="bg-slate-300 w-[28px] h-[28px] rounded-md"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
      </div>
      <div className="w-full flex items-center justify-between gap-x-2 space-y-2">
        <div className="bg-slate-300 w-[28px] h-[28px] rounded-md"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
      </div>
      <div className="w-full flex items-center justify-between gap-x-2 space-y-2">
        <div className="bg-slate-300 w-[28px] h-[28px] rounded-md"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
      </div>
      <div className="w-full flex items-center justify-between gap-x-2 space-y-2">
        <div className="bg-slate-300 w-[28px] h-[28px] rounded-md"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
        <div className="bg-slate-300 w-[38px] h-[38px] rounded-full"></div>
      </div>
    </div>
  );
};
