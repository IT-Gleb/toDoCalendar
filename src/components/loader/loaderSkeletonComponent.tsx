import React from "react";
import Loader from "./loaderComp";

export const LoaderSkeletonComponent = () => {
  return (
    <div className="w-full lg:w-[80%] xl:w-[65%] mx-auto animate-pulse relative">
      <section className="p-4 flex items-center justify-between">
        <div className="bg-slate-300 w-[50px] h-[50px] lg:w-[150px] lg:h-[150px] rounded-full"></div>
        <div className="bg-slate-300 w-[85%] h-[50px] ml-2 lg:h-[100px]"></div>
      </section>
      <section className="p-4 ">
        <div className="flex gap-x-2">
          <aside className="w-[30%] flex flex-col gap-y-2 lg:gap-y-4 p-2 float-left">
            <div className="bg-slate-300 rounded-xl w-[90%] h-[10px] lg:h-[40px]"></div>
            <div className="bg-slate-300 rounded-xl w-[75%] h-[10px] lg:h-[40px]"></div>
            <div className="bg-slate-300 rounded-xl w-[85%] h-[10px] lg:h-[40px]"></div>
            <div className="bg-slate-300 rounded-xl w-[80%] h-[10px] lg:h-[40px]"></div>
            <div className="bg-slate-300 rounded-xl w-[87%] h-[10px] lg:h-[40px]"></div>
          </aside>
          <div className="w-[65%] bg-slate-300 h-[120px] lg:h-[320px]"></div>
        </div>
        <section className="flex flex-col gap-y-3 lg:gap-y-6 mt-4">
          <div className="flex gap-x-4">
            <div className="bg-slate-300 w-[120px] h-[120px]"></div>
            <div className="bg-slate-300 w-[90%] h-[120px]"></div>
          </div>
          <div className="flex gap-x-4">
            <div className="bg-slate-300 w-[90%] h-[120px]"></div>
            <div className="bg-slate-300 w-[120px] h-[120px]"></div>
          </div>
          <div className="flex gap-x-1 lg:gap-x-4">
            <div className="w-[50%] lg:w-[55%] flex flex-col gap-y-4 p-1 lg:p-5">
              <div className="bg-slate-300 w-full h-[80px]"></div>
              <div className="bg-slate-300 w-full h-[80px]"></div>
            </div>
            <aside className="w-[50%] lg:w-[40%] h-[25%] float-left p-1 lg:p-5 flex flex-col gap-y-2">
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
              <div className="bg-slate-300 w-[full] h-[18px] "></div>
            </aside>
          </div>
          <div className="flex gap-x-4">
            <div className="bg-slate-300 w-[80%] h-[70px] ml-auto"></div>
          </div>
          <div className="flex gap-x-4">
            <div className="bg-slate-300 w-[90%] h-[60px]"></div>
          </div>
          <div className="flex gap-x-4">
            <div className="bg-slate-300 w-[950%] h-[60px]"></div>
          </div>
        </section>
      </section>
      <div className="bg-slate-300 w-full h-[30px]"></div>
      <div className=" absolute z-10 w-[150px] h-[150px] p-1 left-[50%] top-[35%] translate-x-[-50%] translate-y-[-35%]">
        <Loader />
      </div>
    </div>
  );
};
