import { Base_URL, decryptId } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { useState, useEffect } from "react";

//Использовать при Next js ssr
//В компоненте: const abc = useAudioStore(useAdiaFiles, (state)=>state);
export const useAudioStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

type TAudioState = {
  files: string[];
  user: TParamUser;
  pathOfAudio: string;
  count: number;
  activeIndex: number;
  audioCurrentPosition: number;
  showList: boolean;
};

type TAudioActions = {
  setUser: (param: TParamUser) => void;
  addToStore: (param: string) => void;
  checkAudioFiles: () => Promise<boolean>;
  setListActiveIndex: (param: number) => void;
  setAudioCurrentPosition: (param: number) => void;
  setShowList: (param: boolean) => void;
};

export const useAudioFiles = create<TAudioState & TAudioActions>()(
  persist(
    (set, get) => ({
      files: [],
      user: { name: "", userId: "" },
      pathOfAudio: "",
      count: 0,
      activeIndex: -1,
      audioCurrentPosition: -1,
      showList: true,
      setUser: (param: TParamUser) => {
        set({ user: param });
        const tUser = get().user;
        set({
          pathOfAudio: `${Base_URL}audio/${
            tUser.name + decryptId(tUser.userId)
          }`,
        });
      },
      addToStore: (param: string) => {
        const tmp: string[] = get().files;
        const activeItem: string =
          get().activeIndex !== -1 ? get().files[get().activeIndex] : "";
        tmp.sort();
        const finded: string | undefined = tmp.find((item) =>
          item.toLowerCase().includes(param.toLowerCase())
        );
        if (typeof finded === "string") {
          return;
        }
        tmp.push(get().pathOfAudio + "/" + param);
        tmp.sort();
        let indx: number = tmp.findIndex((item) =>
          item.toLowerCase().includes(activeItem.toLowerCase())
        );
        //console.log(activeItem, indx);
        set({ files: tmp, count: tmp.length, activeIndex: indx });
      },
      checkAudioFiles: async () => {
        try {
          const url = `/api/audiofiles`;
          const request = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            method: "POST",
            body: JSON.stringify(get().user),
            signal: AbortSignal.timeout(3000),
          });
          if (request.ok) {
            const result = await request.json();
            if (isValue(result)) {
              const tmp: string[] = [];
              result.forEach((item: string) => {
                const path = get().pathOfAudio + "/" + item;
                tmp.push(path);
              });
              set({ files: tmp, count: tmp.length, activeIndex: -1 });
            }
            return true;
          }
          throw new Error("Ошибка получения списка аудио файлов!");
        } catch (err) {
          console.error(err);
          return false;
        } finally {
          //setIsLoading(false);
        }
      },
      setListActiveIndex: (param: number) => {
        set({ activeIndex: param });
      },
      setAudioCurrentPosition: (param: number) => {
        set({ audioCurrentPosition: param });
      },
      setShowList: (param: boolean) => {
        set({ showList: param });
      },
    }),
    {
      name: "audio-storage",
      storage: createJSONStorage(() => sessionStorage), //Используем session Storage
      //Сохраняем только поля кнопки отображения файлов
      partialize: (state) => ({
        showList: state.showList,
      }),
    }
  )
);
