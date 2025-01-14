"use client";

import { memo, useEffect, useRef, useState } from "react";
import Loader from "../loader/loaderComp";
import { isValue } from "@/utils/tasksFunctions";
import { decryptId } from "@/utils/functions";
import UploadFileForm from "../fileUpload/uploadFileForm";
import AudioFilesList from "./audioFilesList";
import { ArrowDown_SVG, ArrowUp_SVG } from "@/utils/svg-icons";

const AudioFilesComponent = memo(({ paramUser }: { paramUser: TParamUser }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathOfAudio: string = `audio/${
    paramUser.name + decryptId(paramUser.userId)
  }`;
  const [click, setClick] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [showList, setShowList] = useState<boolean>(true);
  //для ссылок на radio
  //let radioRefs = [0, 1, 2].map(() => useRef<HTMLInputElement>(null));

  const handlerShowList = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowList((prev) => (prev = !prev));
  };

  const handlerUpdate = () => {
    setClick((prev) => (prev = prev + 1));
    setActiveIndex(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { defaultValue } = event.currentTarget;
    let index: number = Number(defaultValue);
    setActiveIndex(index);
    twistTrack(index);
  };

  const twistTrack = (param: number) => {
    if (!isValue(audioRef.current)) {
      return;
    }
    const audio = audioRef.current as HTMLAudioElement;
    audio.volume = 0.2;
    if (audio.played) {
      audio.pause();
      audio.src = audioFiles[param];
    } else {
      audio.src = audioFiles[param];
    }
    audio.play();
  };

  useEffect(() => {
    let isSubscribed: boolean = true;

    if (isSubscribed) {
      (async function getAudio() {
        setIsLoading(true);
        try {
          const url = "api/audiofiles";
          const request = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(paramUser),
          });
          if (request.ok) {
            const result = await request.json();
            if (isValue(result)) {
              const tmp: string[] = [];
              result.forEach((item: string) =>
                tmp.push(pathOfAudio + "/" + item)
              );

              setAudioFiles(tmp);
              //Инициализировать массив ref на radio
              //radioRefs.length = tmp.length;

              //console.log(tmp);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      })();
    }
    return () => {
      isSubscribed = false;
      //radioRefs.length = 0;
    };
  }, [click]);

  // const setCallbackRefs = (index: number) => (element: HTMLInputElement) => {
  //   (radioRefs[index].current as HTMLInputElement) = element;
  // };

  if (isLoading) {
    return (
      <div className="w-[40px] h-[40px] mx-auto text-gray-600">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-fit mx-auto flex gap-4 items-start justify-center flex-wrap">
      {audioFiles && audioFiles.length > 0 && (
        <div className="w-fit mx-auto flex flex-col items-start justify-start gap-0 relative">
          <div className="absolute z-10 top-9 right-0">
            <button
              type="button"
              className="w-[18px] h-[18px] bg-sky-50 text-sky-950 active:scale-90 rounded-full"
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
              tmpIndx = tmpIndx >= audioFiles.length ? 0 : tmpIndx++;
              twistTrack(tmpIndx);
              setActiveIndex(tmpIndx);
            }}
          >
            <source src={`${audioFiles[activeIndex]}`} type="audio/mp3" />
            <source src={`${audioFiles[activeIndex]}`} type="audio/ogg" />
            <p>Браузер не поддерживает встроенное audio</p>
          </audio>
          <div
            className={`${
              showList ? "h-20 opacity-100" : "h-0 opacity-0"
            } transition-all overflow-y-auto overflow-x-hidden`}
          >
            <AudioFilesList
              paramDir={pathOfAudio}
              param={audioFiles}
              paramIndex={activeIndex}
              paramHandleChange={handleChange}
            />
          </div>
        </div>
      )}
      {/*Загрузка файла на сервер */}
      <UploadFileForm paramUser={paramUser} paramUpdate={handlerUpdate} />
    </div>
  );
});

export default AudioFilesComponent;
