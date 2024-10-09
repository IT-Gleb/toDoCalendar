"use client";

import { useRouter } from "next/navigation";
import React from "react";

const URL_TASKS: string = `/mainTasks`;

export const GoTasksButtonComponent = () => {
  const MyRouter = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    MyRouter.push(URL_TASKS, { scroll: false });
  };
  return (
    <button
      type="button"
      className="w-[120px] min-h-[20px] p-1 bg-slate-500 text-white rounded-sm active:scale-90"
      onClick={handleClick}
    >
      Задачи
    </button>
  );
};
