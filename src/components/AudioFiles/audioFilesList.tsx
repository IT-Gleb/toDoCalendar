import React from "react";

export default function AudioFilesList({
  paramDir,
  param,
  paramIndex,
  paramHandleChange,
}: {
  paramDir: string;
  param: TAudioList;
  paramIndex: number;
  paramHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      {param.length > 0 && (
        <ul>
          {param.map((item, index) => (
            <li
              className={`max-w-[270px] p-1 text-[clamp(0.55rem,3vw,0.75rem)] text-sky-700 ${
                index % 2 === 0 ? "bg-sky-50" : "bg-sky-100"
              }`}
              key={index}
            >
              <label
                htmlFor={`treck-${index}`}
                className="cursor-pointer flex items-center justify-start gap-2"
              >
                <input
                  //ref={setCallbackRefs(index)}
                  type="radio"
                  name="audioGroup"
                  id={`treck-${index}`}
                  defaultValue={index}
                  onChange={paramHandleChange}
                  checked={index === paramIndex}
                  className="scale-75"
                />
                <div className="line-clamp-1">
                  {item.substring(paramDir.length + 1, item.length)}
                </div>
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
