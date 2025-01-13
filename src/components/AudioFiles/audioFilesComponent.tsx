"use client";

import { useEffect, useState } from "react";
import Loader from "../loader/loaderComp";
import { isValue } from "@/utils/tasksFunctions";

type TParamUser = {
  name: string;
  userId: string;
};

const AudioFilesComponent = ({ paramUser }: { paramUser: TParamUser }) => {
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
              setAudioFiles(result);
              // console.log(result);
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
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-[40px] h-[40px] text-green-400">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-fit mx-auto bg-sky-50">
      {audioFiles && audioFiles.length > 0 && (
        <audio
          controls
          //   muted
          // preload="auto"
          className="block border-2 border-sky-700 bg-sky-400 rounded-lg"
        >
          <source src={`${audioFiles[0]}`} type="audio/mp3" />
          <p>Браузер не поддерживает встроенное audio</p>
        </audio>
      )}
    </div>
  );
};

export default AudioFilesComponent;
