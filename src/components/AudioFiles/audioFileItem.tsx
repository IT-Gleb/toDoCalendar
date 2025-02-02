import React, { memo, useEffect, useRef } from "react";

type TFileItemParam = {
  item: string;
  index: number;
  pathDir: string;
  activeIndex: number;
  canView: boolean;
  handleChange: (
    event:
      | React.MouseEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export const AudioFileItem = memo((param: TFileItemParam) => {
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (param.canView) {
      if (param.activeIndex === param.index) {
        liRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest", //вертикальное выравнивание
          inline: "start", //горизонтальное выравнивание
        });
      }
    }
  }, [param.activeIndex, param.canView]);

  return (
    <li
      ref={liRef}
      className={`max-w-[270px] p-1 text-[clamp(0.55rem,3vw,0.75rem)] text-sky-700 ${
        param.index % 2 === 0 ? "bg-sky-50" : "bg-sky-100"
      }`}
    >
      <label
        htmlFor={`treck-${param.index}`}
        className="cursor-pointer flex items-center justify-start gap-2"
      >
        <span>{param.index + 1}.</span>
        <input
          //ref={setCallbackRefs(index)}
          type="radio"
          name="audioGroup"
          id={`treck-${param.index}`}
          defaultValue={param.index}
          onChange={param.handleChange}
          onClick={param.handleChange}
          checked={param.index === param.activeIndex}
          className="scale-75"
        />
        <div
          className={`line-clamp-1 ${
            param.index === param.activeIndex ? "font-bold" : "font-normal"
          }`}
        >
          {param.item.substring(param.pathDir.length + 1, param.item.length)}
        </div>
      </label>
    </li>
  );
});
