"use client";

import { useSession } from "next-auth/react";
import { useLayoutEffect, useState, memo } from "react";
import Loader from "../loader/loaderComp";
import {
  CalculateOpacity,
  ChangeDateItems,
  MyPipeStr,
  returnStrPartOne,
  returnStrPartTwo,
  TASKS_ON_PAGE,
  TimeZoneDateToString,
} from "@/utils/functions";
import Link from "next/link";
import TasksExistsPagination from "./tasksExistsPagination";
import { useDepricatedStore } from "@/store/paginationStore";
import { useShallow } from "zustand/shallow";
import TaskDateChange from "./taskDateChange";
import { useDepricatedDate } from "@/store/DateNoCompletedTaskStore";
import MobileTasksNotCompleted from "./mobileTasksNotCompleted";

//Заголовок таблицы
const TaskTblTop = memo(function TaskTblTop({
  paramWorkDate,
  paramTasksCount,
}: {
  paramWorkDate: string;
  paramTasksCount: number;
}): React.JSX.Element {
  return (
    <div className="hidden sticky top-0 z-[2] sm:grid grid-cols-[25px_1fr_120px_120px] sm:mt-7 gap-x-2 uppercase text-[0.75rem] text-slate-100 font-bold text-center bg-gradient-to-b from-red-500 to-red-50">
      <div className=" col-span-4 p-1 flex flex-wrap items-center justify-center gap-x-2">
        Просроченные задачи, на дату:{" "}
        <span className="text-[1rem] text-yellow-300">{paramWorkDate}</span>
        <span>({paramTasksCount})</span>
      </div>
      <div className="p-1 text-black whitespace-nowrap overflow-hidden">
        N/N
      </div>
      <div className="p-1 text-black overflow-hidden">Наименование</div>
      <div className="p-1 text-black overflow-hidden text-left">Старт</div>
      <div className="p-1 text-black overflow-hidden text-left">Финиш</div>
    </div>
  );
});

const TasksNotCompleted = memo(() => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<TTaskList | TResponseError>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [countTask, setCountTask] = useState<number>(0);
  const Offset: number = useDepricatedStore(
    useShallow((state) => state.activePage)
  );
  const currentDate = useDepricatedDate(useShallow((state) => state.dateStr));

  useLayoutEffect(() => {
    let isSubscribed: boolean = true;

    (async function getNotCompletedTasks() {
      const url: string = "/api/checkTasknotCompleted";
      const params: TPostPartialParams = {
        userid: session?.user.userId as string,
        day: currentDate,
        limit: TASKS_ON_PAGE,
        offset: Offset * TASKS_ON_PAGE,
      };

      setIsLoad(true);
      setTasks([]);
      try {
        const result = await fetch(url, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(params),
          next: { revalidate: 5 },
        });
        if (result.ok) {
          const tempTasks = (await result.json()) as TTaskList;
          if (tempTasks && tempTasks.length > 0) {
            setTasks(tempTasks);
            if (tempTasks && tempTasks[0].taskscount) {
              setCountTask(tempTasks[0].taskscount);
            }
          } else {
            setCountTask(0);
            setTasks([]);
          }
        }
      } catch (err) {
        const tmp: TResponseError = {
          status: (err as Error).name,
          message: (err as Error).message,
        };
        setTasks(tmp);
      } finally {
        setIsLoad(false);
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, [currentDate, Offset]);

  if (isLoad) {
    return (
      <div className="text-red-500 w-[120px] h-[120px] mx-auto">
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

  return (
    <section className="max-w-[95%] mx-auto bg-white">
      <TaskDateChange />
      <MobileTasksNotCompleted paramTasks={tasks} />
      {countTask > 0 && (
        <TaskTblTop paramWorkDate={currentDate} paramTasksCount={countTask} />
      )}
      {!tasks ||
        (tasks.length < 1 && (
          <div className="w-fit mx-auto uppercase text-[0.95rem] md:text-[1.2rem] text-sky-500 font-bold mt-10">
            <p>У вас нет Просроченных задач</p>
          </div>
        ))}
      {tasks &&
        tasks.length > 0 &&
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
            <div
              className=" hidden sm:grid sm:grid-cols-[25px_1fr_120px_120px] sm:auto-rows-min lg:gap-x-4 text-[0.7rem] text-slate-600 even:bg-red-100 p-1"
              key={item.id}
              style={{ opacity: transp }}
            >
              <span>{index + 1}</span>
              <span className="text-[0.8rem] whitespace-nowrap overflow-hidden">
                <Link href={aHref} scroll={false} className="hover:underline">
                  {item.name}
                </Link>
              </span>
              <span className="text-[0.7rem] whitespace-nowrap overflow-hidden">
                {MyPipeStr(
                  TimeZoneDateToString,
                  returnStrPartOne
                )(item.begin_at as unknown as string)}{" "}
                <span className="font-bold text-[0.8rem] text-red-700">
                  {MyPipeStr(
                    TimeZoneDateToString,
                    returnStrPartTwo
                  )(item.begin_at as unknown as string)}
                </span>
              </span>
              <span className=" whitespace-nowrap overflow-hidden">
                {MyPipeStr(
                  TimeZoneDateToString,
                  returnStrPartOne
                )(item.end_at as unknown as string)}{" "}
                <span className="font-bold text-[0.8rem] text-red-700">
                  {MyPipeStr(
                    TimeZoneDateToString,
                    returnStrPartTwo
                  )(item.end_at as unknown as string)}
                </span>
              </span>
            </div>
          );
        })}
      <TasksExistsPagination paramType={"notTasks"} paramCount={countTask} />
    </section>
  );
});

export default TasksNotCompleted;
