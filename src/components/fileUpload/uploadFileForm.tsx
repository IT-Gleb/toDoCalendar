"use client";

import { decryptId, PopoverUp } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import { memo, useRef, useState } from "react";
import Loader from "../loader/loaderComp";
import { useAudioFiles } from "@/store/audioFilesStore";

const MAXSIZE = 15000000; //Файл не больше 15Mb

const UploadFileForm = memo(({ paramUser }: { paramUser: TParamUser }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pError, setPError] = useState<TResError>({
    status: 200,
    message: "",
    ok: false,
  });
  const addToStore = useAudioFiles((state) => state.addToStore);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    let FileName: string = "";
    if (isValue(value)) {
      if (fileRef.current) {
        if (
          isValue(fileRef.current.files) &&
          //@ts-ignore
          fileRef.current.files?.length > 0
        ) {
          //@ts-ignore
          //console.log(fileRef.current.files[0] as unknown as File);
          //@ts-ignore
          const { size, name } = fileRef.current.files[0] as unknown as File;
          FileName = name;
          //console.log(size, name);
          if (size > MAXSIZE) {
            PopoverUp({
              param: `Размер выбранного файла больше ${Math.round(
                MAXSIZE / 1024 / 1000
              )}Mb.`,
              isError: false,
            });
            return;
          }
        }
        //Отправить данные на сервер
        //@ts-ignore
        const FileData = new FormData(formRef.current);
        const userData = Object.assign({}, paramUser);
        userData.userId = decryptId(paramUser.userId);

        FileData.append("folder", JSON.stringify(userData));
        //console.log(FileData);
        setPError({ status: 0, message: "", ok: false });
        try {
          setIsLoading(true);
          const result = await fetch("api/upload", {
            //headers: { "Content-Type": "multipart/form-data" },
            //headers: { "Content-Type": "application/json" },
            // headers: {
            //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            // },
            method: "POST",
            body: FileData,
          });
          if (!result.ok) {
            throw new Error("Ошибка на сервере!");
          }
          const data = await result.json();
          if (data && "status" in data) {
            if (data.status <= 350) {
              setPError({
                status: data.status,
                message: data.message,
                ok: false,
              });
              //Добавить наименование файла в хранилище
              //@ts-ignore
              addToStore(FileName);
            }
          }
          if (data && "status" in data) {
            if (data.status >= 400 && data.status <= 550) {
              throw new Error(data.message);
            }
          }
        } catch (err) {
          setPError({
            status: 500,
            message: (err as Error).message,
            ok: true,
          });
          //console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-[50px] h-[50px] mx-auto text-sky-400">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-1 bg-sky-50 mx-auto flex items-start justify-center gap-x-4 translate-y-[50%]">
      <form ref={formRef} className="flex flex-col gap-y-2">
        <span
          className={`text-[clamp(0.55rem,2vmin,0.65rem)] ${
            pError.ok ? "text-rose-600" : "text-sky-700"
          }`}
        >
          {pError.ok ? pError.message : ""}
        </span>
        <label
          htmlFor="fileUpId"
          aria-labelledby="fileUpId"
          className="max-w-[120px] h-[30px] sm:h-[38px] text-center overflow-hidden bg-sky-200 rounded-md text-sky-800 text-[clamp(0.55rem,2vw,0.65rem)] font-bold cursor-pointer px-2 py-1 transition-shadow hover:shadow-md hover:shadow-sky-700 active:scale-90"
        >
          {`Добавить файл ${Math.round(MAXSIZE / 1024 / 1000)}Mb`}
        </label>
        <input
          ref={fileRef}
          type="file"
          name="fileUpName"
          id="fileUpId"
          aria-label="fileUpid"
          accept="audio/*"
          onChange={handleChange}
          className="w-0 h-0 opacity-0 hidden"
        />
      </form>
    </div>
  );
});

export default UploadFileForm;
