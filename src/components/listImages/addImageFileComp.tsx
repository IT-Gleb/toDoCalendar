import { useImagesUpdateStore } from "@/store/imagesUpdateStore";
import { Base_URL, PopoverUp, randomInteger, Wait } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import { uploadFile } from "@/utils/upload";

import React, { memo, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { RoundLoader } from "../loader/roundLoader";

type TUploadState = "idle" | "upload";
type TFileInfo = {
  fileName: string;
  fileSize: number;
};

export const AddImageFileComp = memo(() => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const abortUploading = useRef<() => void>();

  const [currentFile, setcurrentFile] = useState<File | null>(null);
  const [canUpload, setCanUpload] = useState<TUploadState>("idle");
  const [progress, setProgress] = useState<number>(0);
  const [fileInfo, setFileInfo] = useState<TFileInfo>({
    fileName: "",
    fileSize: 0,
  });

  const setUdateListImages = useImagesUpdateStore(
    useShallow((state) => state.setUpdateCount)
  );

  const abort = () => {
    PopoverUp({ param: "загрузка прервана пользователем!", isError: true });

    abortUploading.current?.();
    reset();
  };

  const reset = () => {
    setCanUpload("idle");
    setProgress(0);
    setFileInfo({ fileName: "", fileSize: 0 });
    abortUploading.current = () => null;
  };

  useEffect(() => {
    //console.log(canUpload);

    if (canUpload === "upload") {
      const onUpload = () => {
        PopoverUp({
          param: `${fileInfo.fileName} - загружен успешно!`,
          isError: false,
        });
        reset();
        setUdateListImages(randomInteger(1, 100)); //Обновить список изображений
      };

      const url = `${Base_URL}api/uploadImage`;
      (function fileOnServer() {
        const filePromise = uploadFile(url, currentFile as File, "file", {
          onProgress: (progress: number) => setProgress(progress),
          path: "images/massage",
        });
        abortUploading.current = filePromise.abort;
        filePromise
          .then(onUpload)
          .catch((err) => {
            if ((err as Error).name === "AbortError") {
              console.log("Aborted...");
            } else {
              console.log(err);
            }
          })
          .finally(reset);
      })();
    }
  }, [canUpload]);

  return (
    <div className="flex items-center justify-center gap-x-2">
      <span className="text-[clamp(0.6rem,4vw,0.7rem)] mr-4">
        {fileInfo.fileSize > 0 &&
          `${fileInfo.fileName} - ${(fileInfo.fileSize / 1024 / 1000).toFixed(
            3
          )}Mb`}
      </span>
      {progress !== 0 && (
        <div className="flex items-center gap-x-2">
          <RoundLoader percent={progress} />
          <button
            type="button"
            title="Отменить загрузку"
            onClick={() => abort()}
            className="w-[20px] h-[20px] border-2 border-slate-500  content-center font-materialSymbolsOutlined font-semibold text-[clamp(0.5rem,4vw,0.65rem)]/[clamp(0.5rem,4vw,0.65rem)] text-red-600 active:scale-90 overflow-hidden"
          >
            close
          </button>
        </div>
      )}
      <form>
        <label
          title="Загрузить файл"
          htmlFor="imgFile"
          className=" inline-block cursor-pointer text-center p-1 overflow-hidden bg-sky-400 text-slate-100 rounded-sm
         text-[clamp(0.8rem,4vw,1rem)]/[clamp(0.8rem,4vw,1rem)] hover:bg-sky-600 hover:shadow-md active:scale-90"
        >
          <span
            title="Загрузить файл"
            className=" inline-block w-[20px] h-[20px] text-[clamp(0.8rem,4vw,1.1rem)]/[clamp(0.8rem,4vw,1.1rem)] font-materialSymbolsOutlined"
          >
            list
          </span>
        </label>
        <input
          ref={inputFileRef}
          type="file"
          name="imgFile"
          id="imgFile"
          onChange={() => {
            //console.log(inputFileRef.current?.files);
            const filesObj = inputFileRef.current?.files as FileList;
            if (isValue(filesObj) && filesObj.length > 0) {
              setcurrentFile(filesObj[0] as File);
              setFileInfo({
                fileName: (filesObj[0] as File).name,
                fileSize: (filesObj[0] as File).size,
              });
              setCanUpload("upload");
            }
          }}
          accept="image/jpeg, image/png, image/webp"
          className="w-0 h-0 opacity-0 border-none outline-none"
        />
      </form>
    </div>
  );
});
