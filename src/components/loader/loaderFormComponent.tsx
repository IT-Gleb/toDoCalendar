import { memo } from "react";

export const LoaderFormComponent = memo(() => {
  return (
    <div className="w-[98%] lg:w-[60%] mx-auto mt-5 px-1 flex flex-col gap-y-5 animate-pulse">
      <div className="h-[40px] bg-slate-500 rounded-md"></div>
      <div className="h-[40px] bg-slate-500 rounded-md"></div>
      <div className="h-[40px] bg-slate-500 rounded-md"></div>
      <div className="h-[90px] bg-slate-500 rounded-md"></div>
      <div className="flex gap-x-3 items-end justify-end mt-2 p-2">
        <div className="w-[120px] h-[40px] bg-slate-500 rounded-md"></div>
        <div className="w-[120px] h-[40px] bg-slate-500 rounded-md"></div>
      </div>
    </div>
  );
});
