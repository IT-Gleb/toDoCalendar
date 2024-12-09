import {
  ChangeDateItemsMonthAdd,
  getNowDateStr,
  isValidDate,
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
    if (isValidDate(param)) {
      const dt = new Date(param);
      if (dt.getFullYear() > 1970) {
        set({ dateStr: param });
      }
    }
  },
}));
