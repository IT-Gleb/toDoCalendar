import { Minus_SVG, Plus_SVG } from "@/utils/svg-icons";
import React, { useState } from "react";

export const AddButtonComponent = ({
  paramTitle,
  paramClick,
}: {
  paramTitle: string;
  paramClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [isPlus, setIsPlus] = useState<boolean>(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsPlus((prev) => (prev = !prev));
    if (paramClick) {
      paramClick(event);
    }
  };

  return (
    <button
      type="button"
      title={paramTitle}
      onClick={handleClick}
      className="w-[32px] h-[32px] rounded-full bg-sky-700 text-white text-center p-1 active:scale-90 active:bg-sky-300"
    >
      {isPlus ? (
        <Plus_SVG pWidth={24} pHeight={24} />
      ) : (
        <Minus_SVG pWidth={24} pHeight={24} />
      )}
    </button>
  );
};
