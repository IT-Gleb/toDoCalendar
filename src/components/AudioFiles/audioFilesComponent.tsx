"use client";

import { memo, useEffect, useRef, useState } from "react";
import { isValue } from "@/utils/tasksFunctions";
import UploadFileForm from "../fileUpload/uploadFileForm";
import AudioFilesList from "./audioFilesList";
import { ArrowDown_SVG, ArrowUp_SVG } from "@/utils/svg-icons";
import { useAudioFiles } from "@/store/audioFilesStore";
import { Wait } from "@/utils/functions";

const AudioFilesComponent = memo(({ paramUser }: { paramUser: TParamUser }) => {
  const filesActiveIndex: number = useAudioFiles((state) => state.activeIndex);
  const setListActiveIndex = useAudioFiles((state) => state.setListActiveIndex);
  const [activeIndex, setActiveIndex] = useState<number>(filesActiveIndex);
  const files = useAudioFiles((state) => state.files);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [showList, setShowList] = useState<boolean>(true);

  //для ссылок на radio
  //let radioRefs = [0, 1, 2].map(() => useRef<HTMLInputElement>(null));

  const handlerShowList = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowList((prev) => (prev = !prev));
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    const { defaultValue } = event.currentTarget;
    let index: number = Number(defaultValue);
    setActiveIndex(index);
    setListActiveIndex(index);
    twistTrack(index);
  };

  const twistTrack = async (param: number) => {
    if (!isValue(audioRef.current || param < 0)) {
      return;
    }
    const audio = audioRef.current as HTMLAudioElement;
    audio.volume = 0.2;
    audio.muted = false;
    // if (audio.played) {
    //   audio.pause();
    //   audio.src = files[param];
    // } else {
    //   audio.src = files[param];
    // }
    audio.pause();
    audio.src = files[param];
    await Wait(800);
    try {
      await audio.play();
    } catch (err) {
      //console.log((err as Error).message);
    }
  };

  // const setCallbackRefs = (index: number) => (element: HTMLInputElement) => {
  //   (radioRefs[index].current as HTMLInputElement) = element;
  // };

  useEffect(() => {
    const audio = audioRef.current as HTMLAudioElement;
    //console.log(filesActiveIndex);
    setActiveIndex(filesActiveIndex);
    if (audio.ended || audio.paused) {
      if (filesActiveIndex > -1) {
        twistTrack(filesActiveIndex);
      }
    }
  }, [filesActiveIndex]);

  return (
    <div
      className={`w-fit mx-auto grid ${
        showList
          ? "grid-cols-[280px] md:grid-cols-[280px_120px]"
          : "grid-cols-[280px]"
      } gap-x-2 `}
    >
      <div className="w-fit mx-auto flex flex-col items-start justify-start gap-0 relative">
        <div className="absolute z-[1] top-7 -right-1">
          <button
            type="button"
            className="w-[24px] h-[24px] scale-50 bg-sky-50 text-sky-950 active:scale-90 rounded-full shadow-md shadow-sky-800"
            onClick={handlerShowList}
            title={
              showList
                ? "Скрыть список воспроизведения"
                : "Показать список воспроизведения"
            }
          >
            {showList ? <ArrowUp_SVG /> : <ArrowDown_SVG />}
          </button>
        </div>
        <audio
          ref={audioRef}
          controls
          //   muted
          preload="auto"
          className="block w-[270px] text-[clamp(0.5rem,2vw,0.6rem)]"
          onEnded={(event) => {
            let tmpIndx: number = activeIndex;
            tmpIndx++;
            tmpIndx = tmpIndx >= files.length ? 0 : tmpIndx;
            setListActiveIndex(tmpIndx);
            //setActiveIndex(tmpIndx);
            //twistTrack(tmpIndx);
          }}
        >
          <source
            // src={`${
            //   files.length > 0 && activeIndex > -1 ? files[activeIndex] : ""
            // }`}
            type="audio/mp3"
          />
          <source
            // src={`${
            //   files.length > 0 && activeIndex > -1 ? files[activeIndex] : ""
            // }`}
            type="audio/ogg"
          />
          <p>Браузер не поддерживает встроенное audio</p>
        </audio>
      </div>
      {/*Загрузка файла на сервер */}
      <div
        className={`transition-all ${
          showList
            ? "row-span-1 order-1 md:order-[0] sm:row-span-2 h-auto opacity-100"
            : "row-span-1 h-0 opacity-0"
        }`}
      >
        <UploadFileForm paramUser={paramUser} />
      </div>
      <div
        className={`${
          showList ? "h-20 opacity-100" : "h-0 opacity-0"
        } transition-all overflow-y-auto overflow-x-hidden`}
      >
        <AudioFilesList
          paramUser={paramUser}
          paramIndex={activeIndex}
          paramHandleChange={handleChange}
        />
      </div>
      {showList && (
        <p className="bg-sky-50 text-[clamp(0.5rem,2vw,0.65rem)] text-sky-700 p-1 col-span-1 md:col-span-2">
          Для проигрывания audio, загрузите файл на сервер. Размер файла не
          более 15Mb
        </p>
      )}
    </div>
  );
});

export default AudioFilesComponent;
