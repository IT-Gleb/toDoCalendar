//Для флага обновления списка изображений

import { create } from "zustand";

type TImagesState = {
  updateCount: number;
};

type TImagesUpdateActions = {
  setUpdateCount: (param: number) => void;
};

export const useImagesUpdateStore = create<TImagesState & TImagesUpdateActions>(
  (set) => ({
    updateCount: 0,
    setUpdateCount: (param: number) => set({ updateCount: param }),
  })
);
