import { useAudioFiles } from "@/store/audioFilesStore";
import React, { memo, useEffect, useState } from "react";
import Loader from "../loader/loaderComp";
import { isValue } from "@/utils/tasksFunctions";
import { AudioFileItem } from "./audioFileItem";

const AudioFilesList = memo(
  ({
    paramUser,
    paramIndex,
    paramInView = false,
    paramHandleChange,
  }: {
    paramUser: TParamUser;
    paramIndex: number;
    paramInView: boolean;
    paramHandleChange: (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLInputElement>
    ) => void;
  }) => {
    const files = useAudioFiles((state) => state.files);
    const checkAudioFiles = useAudioFiles((state) => state.checkAudioFiles);
    const setUser = useAudioFiles((state) => state.setUser);
    const pathDir = useAudioFiles((state) => state.pathOfAudio);
    const count: number = useAudioFiles((state) => state.count);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    //При загрузке получить список файлов
    useEffect(() => {
      let isSubscribed: boolean = true;
      if (isSubscribed) {
        //Если уже есть список файлов
        if (count > 0) {
          return;
        }
        (async function getFiles() {
          if (!isValue(paramUser)) {
            return;
          }
          setUser(paramUser);
          setIsLoad(true);
          try {
            await checkAudioFiles();
          } finally {
            setIsLoad(false);
          }
        })();
      }
      return () => {
        isSubscribed = false;
      };
    }, []);

    if (isLoad) {
      return (
        <div className="w-[40px] h-[40px] mx-auto text-sky-400">
          <Loader />
        </div>
      );
    }

    return (
      <>
        {count < 1 && (
          <p className="uppercase text-sky-600 text-[clamp(0.6rem,4vw,0.8rem)] text-center p-1">
            Нет данных
          </p>
        )}
        {count > 0 && (
          <div className="relative">
            <div className="sticky z-[2] w-[28px] h-[28px] text-center p-1 top-[5%] left-[50%] rounded-full bg-sky-500/40 text-white text-[clamp(0.75rem,2vw,0.9rem)]">
              {count}
            </div>
            <ul>
              {files.map((item, index) => (
                <AudioFileItem
                  key={item + index}
                  pathDir={pathDir}
                  item={item}
                  index={index}
                  activeIndex={paramIndex}
                  handleChange={paramHandleChange}
                  canView={paramInView}
                />
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
);

export default AudioFilesList;
