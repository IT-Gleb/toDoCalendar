import React from "react";
import { MainMenuComponent } from "../menu/mainMenuComponent";

export const HeaderComponent = () => {
  return (
    <header className="w-full min-h-[8vh] bg-slate-800 text-white flex flex-col">
      <MainMenuComponent />
      <div className="w-full h-[2vh] bg-slate-600"></div>
    </header>
  );
};
