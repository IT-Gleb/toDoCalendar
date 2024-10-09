import React from "react";
import { MordaSvgComponent } from "./mordaSvgComponent";

export const MordaComponent = () => {
  return (
    <div className="w-[640px] h-[480px] bg-white p-1 mx-auto">
      <MordaSvgComponent pWidth={640} pHeight={480} />
    </div>
  );
};
