import { usePaginationStore } from "@/store/paginationStore";
import { useTrackerDate } from "@/store/trackerStore";
import {
  CalculateDate,
  getDateWithMonthStr,
  getNowDateStr,
} from "@/utils/functions";
import { useState, memo, useMemo } from "react";
import { useShallow } from "zustand/shallow";

export const TrackerDay = memo(() => {
  const [zeroDate] = useState<string>(getNowDateStr());

  const trackDate = useTrackerDate(useShallow((state) => state.trackerDate));

  const [dayValue, setDayValue] = useState<string>(
    getDateWithMonthStr(trackDate).toLowerCase()
  );
  const position = useTrackerDate(useShallow((state) => state.trackPosition));
  const [rangeValue, setRangeValue] = useState<string>(position.toString());

  const setTrackerDate = useTrackerDate(
    useShallow((state) => state.setTrackerDate)
  );
  const setTrackPosition = useTrackerDate(
    useShallow((state) => state.setTrackPosition)
  );
  //Для сброса пагинации
  const setOffset = usePaginationStore(
    useShallow((state) => state.setActivePage)
  );

  const handleChange = useMemo(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, step } = event.currentTarget;
      let stepDay: number = Number(value) / Number(step);
      let calcDate: string = CalculateDate(zeroDate, stepDay);
      //console.log(calcDate);
      //Передать значение в store
      setTrackerDate(calcDate);
      setTrackPosition(Number(value));

      setDayValue(getDateWithMonthStr(calcDate).toLowerCase());
      setRangeValue(value);
      //Обнулить пагинацию
      setOffset(0);
    },
    [dayValue, setTrackPosition, setRangeValue, setTrackerDate]
  );

  return (
    <div className="w-fit mx-auto p-1 mt-1">
      <input
        type="range"
        name="dayRange"
        id="dayRange"
        min={-45}
        max={45}
        value={rangeValue}
        step={15}
        className="w-[320px] lg:max-w-[500px]"
        onChange={handleChange}
      />
      <div className="w-fit mx-auto p-1 text-[0.7rem] font-semibold text-slate-500">
        {dayValue}
      </div>
    </div>
  );
});

export default TrackerDay;
