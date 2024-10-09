import { Mounths } from "@/utils/data";
import { create } from "zustand";

type TYearMonthData = {
  data: number;
  title: string;
};

type TState = {
  current_date: number;
  yearDates: TYearMonthData[];
};

type TActions = {
  setCurrentDate: (paramDate: number) => void;
  setYearMonths: (paramDate: number) => void;
};

export const useDateSelect = create<TState & TActions>((set, get) => ({
  current_date: Date.now(),
  yearDates: [],

  setCurrentDate: (paramDate: number) =>
    set((state) => ({ current_date: paramDate })),

  setYearMonths: (paramDate: number) => {
    const tmp = new Date(paramDate);
    let tmpArray: TYearMonthData[] = [];
    let data: TYearMonthData = { data: 0, title: "" };
    Mounths.forEach((item, index) => {
      data = { ...data };
      let strMonth: string = item + "-" + tmp.getFullYear(); // + "-" + "01";
      tmp.setMonth(index);

      let abc = new Date(tmp);
      data.data = abc.getTime();
      data.title = strMonth;
      tmpArray.push(data);
    });
    set({ yearDates: tmpArray });
  },
}));
