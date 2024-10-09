"use client";

import { formatDateToInput } from "@/utils/functions";
import React, { useState } from "react";

export const Date1Component = ({ paramDay }: { paramDay?: string }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsActive((prev) => !prev);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsActive((prev) => !prev);
  };

  return (
    <label
      title="Начало"
      tabIndex={1}
      className={`border ${
        isActive
          ? "border-sky-500 text-sky-600"
          : "border-slate-500 text-slate-600"
      } rounded-md p-2 flex flex-col text-[0.6rem] uppercase relative before:absolute before:left-2 before:-top-2 before:content-[attr(title)] before:${
        isActive ? "animate-bounce" : ""
      } before:bg-white before:px-2`}
    >
      <input
        type="datetime-local"
        name="beginTask"
        id="beginTaskId"
        required
        className={`w-full px-2 py-1 outline-none text-[0.9rem] ${
          isActive ? "text-slate-800" : "text-slate-600"
        } placeholder:text-slate-300 placeholder:text-[0.85rem]`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={formatDateToInput(
          new Date(paramDay ? paramDay : Date.now()).getTime()
        )}
      ></input>
    </label>
  );
};
