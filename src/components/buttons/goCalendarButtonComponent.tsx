"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MainMenu } from "@/utils/data";

export const GoCalendarButtonComponent = () => {
  const MyRouter = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    MyRouter.push(MainMenu[3].href, { scroll: false });
  };
  return (
    <button
      type="button"
      className="w-[120px] min-h-[20px] p-1 bg-slate-500 text-white rounded-sm active:scale-90"
      onClick={handleClick}
    >
      Календарь
    </button>
  );
};
