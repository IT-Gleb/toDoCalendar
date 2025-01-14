"use client";

import { memo, useEffect, useRef, useState } from "react";
import Loader from "../loader/loaderComp";
import { isValue } from "@/utils/tasksFunctions";
import { decryptId } from "@/utils/functions";
import UploadFileForm from "../fileUpload/uploadFileForm";

const AudioFilesComponent = memo(({ paramUser }: { paramUser: TParamUser }) => {
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathOfAudio: string = `audio/${
    paramUser.name + decryptId(paramUser.userId)
  }`;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [click, setClick] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  //для ссылок на radio
  //let radioRefs = [0, 1, 2].map(() => useRef<HTMLInputElement>(null));

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

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setClick((prev) => (prev = prev + 1));
    (audioRef.current as HTMLAudioElement).volume = 0.5;
    //console.log(click);
  };

  useEffect(() => {
    let isSubscribed: boolean = true;
    let canPlay: boolean = false;

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

              canPlay = tmp.length > 0;
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
    <div className="w-fit mx-auto bg-sky-50 flex gap-4 items-start justify-center flex-wrap">
      {audioFiles && audioFiles.length > 0 && (
        <audio
          ref={audioRef}
          controls
          //   muted
          preload="auto"
          className="block"
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
      )}
      {audioFiles && audioFiles.length > 0 && (
        <ul>
          {audioFiles.map((item, index) => (
            <li
              className={`p-1 text-[clamp(0.55rem,3vw,0.75rem)] text-sky-700 ${
                index % 2 === 0 ? "bg-sky-100" : "bg-sky-200"
              }`}
              key={index}
            >
              <label
                htmlFor={`treck-${index}`}
                className="cursor-pointer flex items-center justify-start gap-2"
              >
                <input
                  //ref={setCallbackRefs(index)}
                  type="radio"
                  name="audioGroup"
                  id={`treck-${index}`}
                  defaultValue={index}
                  onChange={handleChange}
                  checked={index === activeIndex}
                  className="scale-75"
                />
                {item.substring(pathOfAudio.length + 1, item.length)}
              </label>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-4 items-start justify-start">
        <button
          type="button"
          className="w-[80px] h-[21px] sm:h-[26px] bg-sky-200 text-sky-800 text-[clamp(0.55rem,2vw,0.7rem)] rounded-md hover:shadow-md hover:shadow-sky-600 active:scale-90"
          onClick={handleUpdate}
        >
          Обновить
        </button>
        {/*Загрузка файла на сервер */}
        <UploadFileForm paramUser={paramUser} />
      </div>
    </div>
  );
});

export default AudioFilesComponent;
