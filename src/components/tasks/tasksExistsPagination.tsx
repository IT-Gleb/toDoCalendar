"use client";
import {
  useDepricatedStore,
  usePaginationStore,
} from "@/store/paginationStore";
import { TASKS_ON_PAGE } from "@/utils/functions";

import { useLayoutEffect, useState, memo } from "react";
import { useShallow } from "zustand/shallow";

export const TasksExistsPagination = memo(
  ({
    paramType,
    paramCount,
  }: {
    paramType: TPagination;
    paramCount: number;
  }) => {
    const [pageCount] = useState<number>(Math.ceil(paramCount / TASKS_ON_PAGE));
    const [pages, setPages] = useState<number[]>([]);

    let activePage: number = 0;
    let setActivePage: (param: number) => void;
    if (paramType === "existsTask") {
      activePage = usePaginationStore(useShallow((state) => state.activePage));
      setActivePage = usePaginationStore(
        useShallow((state) => state.setActivePage)
      );
    }
    if (paramType === "notTasks") {
      activePage = useDepricatedStore(useShallow((state) => state.activePage));
      setActivePage = useDepricatedStore(
        useShallow((state) => state.setActivePage)
      );
    }

    useLayoutEffect(() => {
      const tmp: number[] = [];
      let indx: number = 0;
      while (indx < pageCount) {
        tmp[indx] = indx;
        indx++;
      }
      if (tmp.length > 0) {
        setPages(tmp);
      }
    }, [pageCount]);

    const handleButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      paramIndx: number
    ) => {
      event.preventDefault();
      //console.log(paramIndx);
      setActivePage(paramIndx);
    };

    return (
      <div className="w-[80%] mx-auto p-2 flex items-center justify-center gap-x-1 gap-y-2 flex-wrap">
        {pages &&
          pages.length > 1 &&
          pages.map((item) => (
            <button
              key={item}
              type="button"
              className={`${
                item === activePage && paramType === "existsTask"
                  ? "bg-green-400 border border-sky-400"
                  : item === activePage && paramType === "notTasks"
                  ? "bg-green-400 border border-sky-300"
                  : paramType === "notTasks"
                  ? "bg-red-300 text-slate-100"
                  : "bg-sky-300 text-yellow-700"
              }
              rounded-sm text-[0.7rem] uppercase px-2 py-[1px] active:scale-90`}
              onClick={(e) => handleButtonClick(e, item)}
            >
              {item + 1}
            </button>
          ))}
      </div>
    );
  }
);

export default TasksExistsPagination;
