"use client";

import { decryptId } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import { useRef, useState } from "react";
import Loader from "../loader/loaderComp";

const UploadFileForm = ({ paramUser }: { paramUser: TParamUser }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pError, setPError] = useState<TResError>({
    status: 200,
    message: "",
    ok: false,
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
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
          const { name } = fileRef.current.files[0] as unknown as File;
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
            }
          }
          if (data && "status" in data) {
            if (data.status >= 400 && data.status <= 550) {
              throw new Error(data.message);
            }
          }
        } catch (err) {
          setPError({ status: 500, message: (err as Error).message, ok: true });
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
    <section className="p-1 bg-sky-50 mx-auto flex items-start justify-center gap-x-4">
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
          className="max-w-[120px] h-[21px] sm:h-[26px] text-center overflow-hidden bg-sky-200 rounded-md text-sky-800 text-[clamp(0.55rem,2vw,0.75rem)] font-bold cursor-pointer px-2 py-1 active:scale-90"
        >
          Выбрать&nbsp;файл
        </label>
        <input
          ref={fileRef}
          type="file"
          name="fileUpName"
          id="fileUpId"
          accept="audio/*"
          onChange={handleChange}
          className="w-0 h-0 opacity-0 hidden"
        />
      </form>
    </section>
  );
};

export default UploadFileForm;
