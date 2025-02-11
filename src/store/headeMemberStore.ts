import { create } from "zustand";

type TState = {
  memberHeight: number;
};

type TMemberAction = {
  setHeaderHeight: (param: number) => void;
};

export const useHeaderMemberHeight = create<TState & TMemberAction>((set) => ({
  memberHeight: -1,
  setHeaderHeight: (param: number) => set({ memberHeight: param }),
}));
