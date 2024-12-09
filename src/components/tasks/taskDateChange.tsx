import { useDepricatedDate } from "@/store/DateNoCompletedTaskStore";
import { useDepricatedStore } from "@/store/paginationStore";
import {
  ChangeDateItemsMonthAdd,
  getNowDateStr,
  isValidDate,
  MyPipeStr,
} from "@/utils/functions";
import { useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function TaskDateChange() {
  const dtCurrent = useDepricatedDate((state) => state.dateStr);
  const [dateValue, setDateValue] = useState<string>(dtCurrent);
  const setNewDate = useDepricatedDate(useShallow((state) => state.setNewDate));
  const setOffset = useDepricatedStore(
    useShallow((state) => state.setActivePage)
  );

  const dtRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    //console.log(value);
    setDateValue(value);
    if (isValidDate(value)) {
      const dt = new Date(value);
      if (dt.getFullYear() > 1970) {
        setOffset(0);
        setNewDate(value);
      }
    }
    //setNewDate(value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const dtNew: string = MyPipeStr(ChangeDateItemsMonthAdd)(getNowDateStr());
    setOffset(0);
    setNewDate(dtNew);
    //setDateValue(dtNew);
    if (dtRef.current) {
      dtRef.current.focus();
    }
  };

  return (
    <div className="w-fit mx-auto">
      <span className=" flex items-center justify-center gap-x-3 lg:flex-nowrap text-slate-500 text-[0.7rem]">
        Определите дату [dd.mm.yyyy]:
        <input
          ref={dtRef}
          type="date"
          name="dateTask"
          id="tskDate"
          className="p-1 border-b outline-none border-stone-500 text-[1rem] bg-transparent text-sky-700 font-semibold font-mono"
          value={dateValue}
          onChange={handleDateChange}
        />
        <button
          tabIndex={-1}
          type="button"
          title="Установить текущую дату"
          className="w-[20px] h-[18px] px-1 text-[0.5rem] font-bold active:scale-90 bg-red-300 text-slate-100"
          onClick={handleButtonClick}
        >
          D
        </button>
      </span>
    </div>
  );
}
