import React, { useEffect, useState } from "react";

const loadColor: string = "#31C48D";

function setPercent(param: number) {
  const maxPosition = 360;
  let current = Math.round((maxPosition * param) / 100);
  return current;
}

export const RoundLoader = ({ percent }: { percent: number }) => {
  const [position, setPosition] = useState<number>(percent);

  useEffect(() => {
    setPosition(setPercent(percent));
  }, [percent]);

  return (
    <div
      className="w-[36px] h-[36px] rounded-full bg-sky-700 overflow-hidden relative"
      style={{
        background: `conic-gradient(${loadColor} 0deg ${position}deg, transparent ${position}deg 360deg)`,
      }}
    >
      <div className="absolute w-[24px] h-[24px] rounded-full text-[clamp(0.4rem,4vw,0.5rem)] content-center text-center bg-white text-sky-700 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden">
        {percent}%
      </div>
    </div>
  );
};
