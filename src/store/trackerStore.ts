import { ChangeDateItemsMonthAdd, getNowDateStr } from "@/utils/functions";
import { create } from "zustand";

type TTrackerStateDate = {
  trackerDate: string;
  trackerDateDb: string;
  trackPosition: number;
};

type TTrackerActions = {
  setTrackerDate: (param: string) => void;
  setTrackPosition: (param: number) => void;
};

export const useTrackerDate = create<TTrackerStateDate & TTrackerActions>(
  (set) => ({
    trackerDate: getNowDateStr(),
    trackerDateDb: ChangeDateItemsMonthAdd(getNowDateStr()),
    trackPosition: 0,
    setTrackerDate: (param: string) =>
      set((state) => ({
        trackerDate: param,
        trackerDateDb: ChangeDateItemsMonthAdd(param),
      })),
    setTrackPosition: (param: number) =>
      set((state) => ({ trackPosition: param })),
  })
);
