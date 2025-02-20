//Вывод списка изображений
"use client";

import React, { useEffect, useState } from "react";
import Loader from "../loader/loaderComp";
import { Base_URL } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import { ImageItem } from "./imageItem";

const scanDir: string = "images/massage";
const abortRequestTimeOut: number = 1500;

type TImagesData = {
  path: string;
  files: { name: string; url: string }[];
};

type TErrorData = {
  status: number;
  message: string;
};

export const ListImagesComp = ({ update }: { update: number }) => {
  const [listImages, setListImages] = useState<{ name: string; url: string }[]>(
    []
  );
  const [imgPath, setImagesPath] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exError, setError] = useState<TErrorData>({ status: 0, message: "" });
  const [click, setClick] = useState<number>(0);

  useEffect(() => {
    let isSubscaribed: boolean = true;

    if (isSubscaribed) {
      (async function getImages(param: number) {
        let count: number = param;
        setError({ status: 0, message: "" });
        setIsLoading(true);
        count++;
        //        console.log("Попытка=", count);
        if (count > 3) {
          setIsLoading(false);
          setError({ status: 503, message: "Сервис недоступен." });
          return;
        }
        try {
          const url = `/api/images`;
          const result = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            mode: "no-cors",
            signal: AbortSignal.timeout(
              abortRequestTimeOut * (click < 3 ? click + 1 : 3)
            ),
            body: JSON.stringify({ imgPath: scanDir }),
            next: { tags: ["images-Files"], revalidate: 3600 },
          });

          if (result.ok) {
            const data = (await result.json()) as TImagesData;

            console.log(data);

            if (isValue(data)) {
              setImagesPath((data as TImagesData).path);
              setListImages((data as TImagesData).files);
            }
          }
          if (!result.ok) {
            let msg = await result.text();
            throw new Error(msg as unknown as string);
          }
          setIsLoading(false);
        } catch (err) {
          console.log((err as Error).name);
          setIsLoading(false);

          setError({
            status: 503,
            message:
              (err as Error).message +
              "  Время отклика превышено. Сервер недоступен! Попробуйте повторить запрос позже...",
          });

          switch ((err as Error).name) {
            case "AbortError":
            case "TimeoutError":
              getImages(count);
              break;

            default:
              setError({
                status: 503,
                message:
                  (err as Error).message +
                  "  Время отклика превышено. Сервер недоступен! Попробуйте повторить запрос позже...",
              });

              break;
          }
          //          console.log((err as Error).name);
        }
      })(0);
    }

    return () => {
      isSubscaribed = false;
    };
  }, [click, update]);

  if (isLoading) {
    return (
      <div className="w-[30px] h-[30px] mx-auto mt-1 text-sky-600 ">
        <Loader />
      </div>
    );
  }

  if (exError.status !== 0) {
    return (
      <div className="w-fit mx-auto flex flex-col gap-y-2 text-[clamp(0.7rem,3vw,0.85rem)] text-red-600">
        <h5>{exError.status}</h5>
        <p>{exError.message}</p>
        <button
          type="button"
          className="w-[120px] h-[28px] rounded-sm bg-sky-500 text-slate-100 transition-shadow p-1 active:scale-90 hover:bg-sky-700 hover:text-white hover:shadow-md"
          onClick={() => setClick(click + 1)}
        >
          Повторить
        </button>
      </div>
    );
  }

  return (
    <section className="p-1 sm:p-2">
      <div className="flex items-start gap-x-3 border-b-[6px] border-double border-b-slate-300">
        <span className=" font-materialSymbolsOutlined">folder</span>
        <h3 className="uppercase font-semibold text-[clamp(1rem,4vw,1.6rem)]/[clamp(1rem,4vw,1.6rem)]">
          Изображения
        </h3>
      </div>
      <div className="w-fit mx-auto mt-2 border-b-2 border-b-slate-300">
        {listImages && listImages.length > 0 && (
          <div className="sm:p-1 grid grid-cols-[320px] md:grid-cols-[280px_280px] lg:grid-cols-[280px_280px_280px] xl:grid-cols-[220px_220px_220px_220px_220px] gap-x-2">
            {listImages.map((item, index) => (
              <ImageItem
                key={index}
                srcImage={`/${scanDir}/${item.name}`}
                Img={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
