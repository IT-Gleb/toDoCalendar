import React, { useState } from "react";

export const StatusComponent = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsActive((prev) => !prev);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsActive((prev) => !prev);
  };

  return (
    <label
      title="Статус"
      tabIndex={3}
      className={`border ${
        isActive
          ? "border-sky-500 text-sky-600"
          : "border-slate-500 text-slate-600"
      } rounded-md px-2 py-4 flex items-center justify-center gap-x-4 text-[0.6rem] uppercase relative before:absolute before:left-2 before:-top-2 before:content-[attr(title)] before:${
        isActive ? "animate-bounce" : ""
      } before:bg-white before:px-2`}
    >
      <label className="flex items-start gap-x-2 cursor-pointer">
        <input
          type="radio"
          name="status"
          id="radio1Id"
          defaultValue={Number(true)}
          defaultChecked
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        Не закончена
      </label>
      <label className="flex items-start gap-x-2 cursor-pointer">
        <input
          type="radio"
          name="status"
          id="radio12d"
          defaultValue={Number(false)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        Закончена
      </label>
    </label>
  );
};
