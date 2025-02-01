import { useAudioFiles } from "@/store/audioFilesStore";
import React, { useEffect, useState } from "react";
import Loader from "../loader/loaderComp";
import { isValue } from "@/utils/tasksFunctions";

export default function AudioFilesList({
  paramUser,
  paramIndex,
  paramHandleChange,
}: {
  paramUser: TParamUser;
  paramIndex: number;
  paramHandleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => void;
}) {
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
      if (files.length > 0) {
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
      {files.length > 0 && (
        <div className="relative">
          <div className="sticky z-[2] w-[28px] h-[28px] text-center p-1 top-[5%] left-[50%] rounded-full bg-sky-500/40 text-white text-[clamp(0.75rem,2vw,0.9rem)]">
            {count}
          </div>
          <ul>
            {files.map((item, index) => (
              <li
                className={`max-w-[270px] p-1 text-[clamp(0.55rem,3vw,0.75rem)] text-sky-700 ${
                  index % 2 === 0 ? "bg-sky-50" : "bg-sky-100"
                }`}
                key={index}
              >
                <label
                  htmlFor={`treck-${index}`}
                  className="cursor-pointer flex items-center justify-start gap-2"
                >
                  <span>{index + 1}.</span>
                  <input
                    //ref={setCallbackRefs(index)}
                    type="radio"
                    name="audioGroup"
                    id={`treck-${index}`}
                    defaultValue={index}
                    onChange={paramHandleChange}
                    onClick={paramHandleChange}
                    checked={index === paramIndex}
                    className="scale-75"
                  />
                  <div className="line-clamp-1">
                    {item.substring(pathDir.length + 1, item.length)}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
