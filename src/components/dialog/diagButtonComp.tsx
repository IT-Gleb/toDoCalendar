// "use client";

import React from "react";

export const DiagButtonComp = ({ click }: { click: () => void }) => {
  const dialogClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    click();
  };
  return (
    <button
      type="button"
      className="w-[120px] h-[40px] p-2 place-content-center bg-slate-600 text-white text-[0.8rem] active:scale-90"
      onClick={dialogClick}
    >
      Dialog
    </button>
  );
};
