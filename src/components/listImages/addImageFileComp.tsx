import { isValue } from "@/utils/tasksFunctions";
import React, { memo, useRef, useState } from "react";

export const AddImageFileComp = memo(() => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [currentFile, setcurrentFile] = useState<File | null>(null);

  return (
    <div className="flex items-center gap-x-2">
      <span className="text-[clamp(0.6rem,4vw,0.7rem)] mr-4">
        {currentFile &&
          `${currentFile.name} - ${(currentFile.size / 1024 / 1000).toFixed(
            3
          )}Mb`}
      </span>
      <form>
        <label
          title="Загрузить файл"
          htmlFor="imgFile"
          className="cursor-pointer w-[120px] h-[28px] text-center p-1 overflow-hidden bg-sky-400 text-slate-100 rounded-sm transition-shadow
         text-[clamp(0.8rem,4vw,1rem)]/[clamp(0.8rem,4vw,1rem)] hover:bg-sky-600 hover:shadow-md active:scale-90"
        >
          <span
            title="Загрузить файл"
            className="text-[clamp(0.8rem,4vw,1.1rem)]/[clamp(0.8rem,4vw,1.1rem)] font-materialSymbolsOutlined"
          >
            list
          </span>
        </label>
        <input
          ref={inputFileRef}
          type="file"
          name="imgFile"
          id="imgFile"
          onChange={async () => {
            //console.log(inputFileRef.current?.files);
            const filesObj = inputFileRef.current?.files as FileList;
            if (isValue(filesObj) && filesObj.length > 0) {
              setcurrentFile(filesObj[0] as File);
            }
          }}
          accept="image/jpeg, image/png, image/webp"
          className="w-0 h-0 opacity-0 border-none outline-none"
        />
      </form>
    </div>
  );
});
