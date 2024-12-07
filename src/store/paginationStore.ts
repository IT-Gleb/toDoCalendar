//Хранилище для пагинации не выполненных задач
import { create } from "zustand";

type TPaginationState = {
  activePage: number;
};

type TPaginationAction = {
  setActivePage: (param: number) => void;
};

export const usePaginationStore = create<TPaginationState & TPaginationAction>(
  (set) => ({
    activePage: 0,
    setActivePage: (param: number) => {
      set({ activePage: param });
    },
  })
);
