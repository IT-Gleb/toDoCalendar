"use client";

import { useTrackerDate } from "@/store/trackerStore";
import {
  CalculateOpacity,
  ChangeDateItems,
  MyPipeStr,
  returnStrPartOne,
  returnStrPartTwo,
  TASKS_ON_PAGE,
  TimeZoneDateToString,
} from "@/utils/functions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState, memo } from "react";
import { useShallow } from "zustand/shallow";
import Loader from "../loader/loaderComp";
import TasksExistsPagination from "./tasksExistsPagination";
import { usePaginationStore } from "@/store/paginationStore";
import MobileTasksExists from "./mobileTasksExists";

const TaskTblTop = memo(function TaskTblTop({
  paramWorkDate,
  paramTasksCount,
}: {
  paramWorkDate: string;
  paramTasksCount: number;
}): React.JSX.Element {
  return (
    <div className="hidden sticky top-0 z-[2] sm:grid grid-cols-[25px_1fr_120px_120px] gap-x-2 uppercase text-[0.75rem] text-slate-500 font-bold text-center bg-gradient-to-b from-sky-400 to-sky-50">
      <div className=" col-span-4 p-1 flex flex-wrap items-center justify-center gap-x-2">
        Незавершенные текущие задачи, от даты:{" "}
        <span className="text-[1rem] text-slate-700">{paramWorkDate}</span>
        <span>({paramTasksCount})</span>
      </div>
      <div className="p-1 text-slate-600 whitespace-nowrap overflow-hidden">
        N/N
      </div>
      <div className="p-1 text-slate-600 overflow-hidden">Наименование</div>
      <div className="p-1 text-slate-600 overflow-hidden text-left">Старт</div>
      <div className="p-1 text-slate-600 overflow-hidden text-left">Финиш</div>
    </div>
  );
});

export const TasksExists = memo(() => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<TTaskList | TResponseError>([]);
  const WorkDate = useTrackerDate(useShallow((state) => state.trackerDateDb));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasksCount, setTasksCount] = useState<number>(0);
  //Пагинация
  const Offset: number = usePaginationStore((state) => state.activePage);
  //console.log(WorkDate, Offset);

  //Запрос на задачи
  useEffect(() => {
    let isSubscribed: boolean = true;
    if (isSubscribed) {
      (async function getExistsTasks() {
        const url: string = "/api/checklast10";
        setIsLoading(true);
        setTasks([]);
        try {
          const result = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              id: session?.user.userId,
              day: WorkDate,
              limit: TASKS_ON_PAGE,
              offset: Offset * TASKS_ON_PAGE,
            }),
            next: { revalidate: 0 },
          });
          if (result.ok) {
            const existsTasks = (await result.json()) as TTaskList;
            if (existsTasks && existsTasks.length > 0) {
              setTasks(existsTasks);
              if (existsTasks[0].taskscount) {
                setTasksCount(existsTasks[0].taskscount);
              }
            }
          }
          //console.log(caravanValue);
        } finally {
          setIsLoading(false);
        }
      })();
    }

    return () => {
      isSubscribed = false;
    };
  }, [WorkDate, Offset]);

  if (isLoading) {
    return (
      <div className="w-[80px] h-[80px] mx-auto mt-10 text-sky-500">
        <Loader />
      </div>
    );
  }

  if ("status" in tasks) {
    return (
      <div className="w-fit mx-auto text-red-500">
        <div className="text-[1.2rem]">{tasks.status}</div>
        <div className="text-[0.9rem]">{tasks.message}</div>
      </div>
    );
  }

  if (!tasks || tasks.length < 1) {
    return (
      <div className="w-fit mx-auto p-2 text-[1.1rem] text-sky-500 uppercase font-bold">
        У Вас нет незавершенных задач
      </div>
    );
  }

  return (
    <section className="max-w-[95%] mx-auto relative overflow-hidden bg-white">
      <MobileTasksExists paramWorkDate={WorkDate} paramTasks={tasks} />
      <div className="hidden sm:block overflow-y-auto overflow-x-hidden max-h-[53vh]">
        {/* Заголовок таблицы */}
        <TaskTblTop paramWorkDate={WorkDate} paramTasksCount={tasksCount} />

        <ul className="p-2 text-[0.7rem]">
          {tasks.length > 0 &&
            tasks.map((item, index, array) => {
              let transp: number = 1;
              //Прозрачность позиции
              transp = CalculateOpacity(index, array.length);

              let aHref: string =
                "/tasks/" +
                MyPipeStr(
                  TimeZoneDateToString,
                  returnStrPartOne,
                  ChangeDateItems
                )(item.begin_at as unknown as string);

              return (
                <li
                  key={item.id}
                  className="p-1 grid grid-cols-[25px_1fr_120px_120px] gap-x-2 text-[0.8rem] even:bg-sky-100"
                  style={{ opacity: transp }}
                >
                  {index + 1}.
                  <Link
                    href={aHref}
                    scroll={false}
                    className="hover:underline whitespace-nowrap overflow-hidden"
                  >
                    {item.name}
                  </Link>
                  <div className="text-sky-800 text-[0.7rem] uppercase flex items-center gap-x-1">
                    {MyPipeStr(
                      TimeZoneDateToString,
                      returnStrPartOne
                    )(item.begin_at as unknown as string)}
                    <span className="text-[0.75rem] text-blue-900 font-bold">
                      {MyPipeStr(
                        TimeZoneDateToString,
                        returnStrPartTwo
                      )(item.begin_at as unknown as string)}
                    </span>
                  </div>
                  <div className="text-sky-800 text-[0.7rem] uppercase flex items-center gap-x-1">
                    {MyPipeStr(
                      TimeZoneDateToString,
                      returnStrPartOne
                    )(item.end_at as unknown as string)}
                    <span className="text-[0.75rem] text-blue-900 font-bold">
                      {MyPipeStr(
                        TimeZoneDateToString,
                        returnStrPartTwo
                      )(item.end_at as unknown as string)}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {/* Пагинация по задачам */}
      <TasksExistsPagination paramType={"existsTask"} paramCount={tasksCount} />
    </section>
  );
});

export default TasksExists;
