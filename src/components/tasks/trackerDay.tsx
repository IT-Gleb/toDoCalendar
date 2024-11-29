import {
  CalculateDate,
  getDateWithMonthStr,
  getNowDateStr,
} from "@/utils/functions";
import { useState } from "react";

export default function TrackerDay() {
  const [zeroDate] = useState<string>(getNowDateStr());
  const [dayValue, setDayValue] = useState<string>(
    getDateWithMonthStr(zeroDate).toLowerCase()
  );
  const [rangeValue, setRangeValue] = useState<string>("0");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, step } = event.currentTarget;
    let stepDay: number = Number(value) / Number(step);
    let calcDate: string = CalculateDate(zeroDate, stepDay);
    //console.log(calcDate);

    setDayValue(getDateWithMonthStr(calcDate).toLowerCase());
    setRangeValue(value);
  };

  return (
    <div className="w-fit mx-auto p-2 mt-1 mb-1">
      <input
        type="range"
        name="dayRange"
        id="dayRange"
        min={-45}
        max={45}
        value={rangeValue}
        step={15}
        className="w-[300px] lg:w-[500px]"
        onChange={handleChange}
      />
      <div className="w-fit mx-auto p-1 text-[0.9rem] text-slate-600">
        {dayValue}
      </div>
    </div>
  );
}
