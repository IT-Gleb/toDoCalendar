import {
  ChangeDateItemsMonthAdd,
  getNowDateStr,
  MyPipeStr,
} from "@/utils/functions";
import { create } from "zustand";

type TDeprecatedDateState = {
  dateStr: string;
};

type TDeprecatedDateAction = {
  setNewDate: (param: string) => void;
};

export const useDepricatedDate = create<
  TDeprecatedDateState & TDeprecatedDateAction
>((set) => ({
  dateStr: MyPipeStr(ChangeDateItemsMonthAdd)(getNowDateStr()),
  setNewDate: (param: string) => {
    set({ dateStr: param });
  },
}));
