"use client";

import { memo, useEffect, useRef, useState } from "react";
import { isValue } from "@/utils/tasksFunctions";
import UploadFileForm, { MAXSIZEMB } from "../fileUpload/uploadFileForm";
import AudioFilesList from "./audioFilesList";
import { ArrowDown_SVG, ArrowUp_SVG } from "@/utils/svg-icons";
import { useAudioFiles, useAudioStore } from "@/store/audioFilesStore";
import { Wait } from "@/utils/functions";
import { useShallow } from "zustand/shallow";

const AudioFilesComponent = memo(({ paramUser }: { paramUser: TParamUser }) => {
  const filesActiveIndex = useAudioStore(
    useAudioFiles,
    useShallow((state) => state.activeIndex)
  );

  const [activeIndex, setActiveIndex] = useState<number | undefined>(
    filesActiveIndex
  );
  const showList = useAudioStore(
    useAudioFiles,
    useShallow((state) => state.showList)
  );

  const count = useAudioStore(
    useAudioFiles,
    useShallow((state) => state.count)
  );

  const {
    files,
    setShowList,
    setAudioCurrentPosition: setCurrAudioPos,
    audioCurrentPosition: currentAudioPos,
    setListActiveIndex,
  } = useAudioFiles(useShallow((state) => state));

  const audioRef = useRef<HTMLAudioElement>(null);

  //для ссылок на radio
  //let radioRefs = [0, 1, 2].map(() => useRef<HTMLInputElement>(null));

  const handlerShowList = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const canList: boolean = !showList;

    setShowList(canList);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    const { defaultValue } = event.currentTarget;
    let index: number = Number(defaultValue);
    //console.log(index);
    if (!isValue(index)) {
      index = filesActiveIndex as number;
    }
    setActiveIndex(index);
    setListActiveIndex(index);
    setCurrAudioPos(0);
    twistTrack(index);
  };

  const twistTrack = async (param: number) => {
    if (!isValue(audioRef.current || param < 0)) {
      return;
    }
    const audio = audioRef.current as HTMLAudioElement;
    audio.volume = 0.5;
    audio.muted = false;
    // if (audio.played) {
    //   audio.pause();
    //   audio.src = files[param];
    // } else {
    //   audio.src = files[param];
    // }
    audio.pause();
    audio.src = files[param];
    audio.playbackRate = 1.1;
    await Wait(800);
    try {
      await audio.play();
      if (currentAudioPos !== -1 && currentAudioPos < audio.duration) {
        audio.currentTime = currentAudioPos;
      }
      //audio.currentTime = randomInteger(10, 45);
      // console.log((audio.duration / 60).toFixed(2));
    } catch (err) {
      //console.log((err as Error).message);
    }
  };

  // const setCallbackRefs = (index: number) => (element: HTMLInputElement) => {
  //   (radioRefs[index].current as HTMLInputElement) = element;
  // };

  useEffect(() => {
    const audio = audioRef.current as HTMLAudioElement;
    setActiveIndex(filesActiveIndex);
    if (!isValue(audio)) {
      return;
    }
    if (Number(filesActiveIndex) > -1 && files.length > 0) {
      audio.src = files[Number(filesActiveIndex)];
    }

    function AudioClick(event: MouseEvent) {
      const obj = event.target as HTMLElement;

      //console.log(obj.tagName);
      const canSetPos: boolean =
        obj.tagName === "A" ||
        obj.tagName === "DIV" ||
        obj.tagName === "LABEL" ||
        obj.tagName === "INPUT";
      //console.log(canSetPos);
      if (!canSetPos) {
        return;
      }

      if (audio.played) {
        setCurrAudioPos(audio.currentTime);
        //console.log(audio.currentTime);
      }
      if (audio.paused) {
        setCurrAudioPos(-1);
      }
    }

    document.addEventListener("click", AudioClick, false);
    return () => {
      document.removeEventListener("click", AudioClick, false);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current as HTMLAudioElement;
    //console.log(filesActiveIndex);
    setActiveIndex(filesActiveIndex);
    if (!isValue(audio)) {
      return;
    }
    if ((audio.ended || audio.paused) && currentAudioPos !== -1) {
      if (Number(filesActiveIndex) > -1) {
        twistTrack(Number(filesActiveIndex));
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
        {count !== undefined && count > 0 && (
          <>
            <div className="absolute z-[1] top-7 -right-1">
              <button
                type="button"
                className="w-[24px] h-[24px] scale-50 bg-sky-50 text-sky-950 active:scale-75 rounded-full shadow-md shadow-sky-800"
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
                setCurrAudioPos(0);
                let tmpIndx: number = Number(activeIndex);
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
          </>
        )}
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
        style={{ scrollbarWidth: "none" }}
      >
        <AudioFilesList
          paramUser={paramUser}
          paramIndex={Number(activeIndex)}
          paramInView={Boolean(showList)}
          paramHandleChange={handleChange}
        />
      </div>
      {showList && (
        <p className="bg-sky-50 text-[clamp(0.5rem,2vw,0.65rem)] text-sky-700 p-1 col-span-1 md:col-span-2">
          {`Для проигрывания audio, загрузите файл на сервер. Размер файла не
          более ${MAXSIZEMB}Mb`}
        </p>
      )}
    </div>
  );
});

export default AudioFilesComponent;
