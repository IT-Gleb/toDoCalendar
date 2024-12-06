"use client";

import { useTrackerDate } from "@/store/trackerStore";
import {
  CalculateOpacity,
  ChangeDateItems,
  MyPipeStr,
  returnStrPartOne,
  returnStrPartTwo,
  TimeZoneDateToString,
} from "@/utils/functions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState, memo } from "react";
import { useShallow } from "zustand/shallow";
import Loader from "../loader/loaderComp";

type TResponseError = {
  status: string;
  message: string;
};

const MobileTaskTblTop = memo(function MobileTaskTblTop({
  paramWorkDate,
}: {
  paramWorkDate: string;
}): React.JSX.Element {
  return (
    <div className="sm:hidden sticky left-0 z-[2] grid grid-cols-[25px_60px] auto-rows-[35px] bg-sky-600 uppercase text-slate-200">
      <div className=" row-span-4 text-slate-100 vertical-text text-center text-[0.75rem] font-bold py-2 px-1 bg-sky-400 scale-x-180">
        Незавершенные
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold ">
        N/N
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold">
        Наимен...
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold">
        Старт
      </div>
      <div className="p-1 text-slate-100 overflow-hidden border-b border-b-white text-[0.6rem] font-bold">
        Финиш
      </div>
    </div>
  );
});

const TaskTblTop = memo(function TaskTblTop({
  paramWorkDate,
  paramTasksCount,
}: {
  paramWorkDate: string;
  paramTasksCount: number;
}): React.JSX.Element {
  return (
    <div className="hidden sticky top-0 z-[2] sm:grid grid-cols-[25px_200px_120px_120px] gap-x-2 uppercase text-[0.75rem] text-slate-500 font-bold text-center bg-gradient-to-b from-sky-300 to-sky-100">
      <div className=" col-span-4 p-1 flex flex-wrap items-center justify-center gap-x-2">
        Незавершенные текущие задачи, от даты:{" "}
        <span className="text-[1rem] text-slate-700">{paramWorkDate}</span>
        <span>({paramTasksCount})</span>
      </div>
      <div className="p-1 text-slate-600 whitespace-nowrap overflow-hidden">
        N/N
      </div>
      <div className="p-1 text-slate-600 overflow-hidden">Наименование</div>
      <div className="p-1 text-slate-600 overflow-hidden">Старт</div>
      <div className="p-1 text-slate-600 overflow-hidden">Финиш</div>
    </div>
  );
});

export default function TasksExists() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<TTaskList | TResponseError>([]);
  const WorkDate = useTrackerDate(useShallow((state) => state.trackerDateDb));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasksCount, setTasksCount] = useState<number>(0);
  //console.log(WorkDate);

  //Запрос на задачи
  useEffect(() => {
    let isSubscribed: boolean = true;
    if (isSubscribed) {
      (async function getExistsTasks() {
        const url: string = "/api/checklast10";
        setIsLoading(true);
        try {
          const result = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              id: session?.user.userId,
              day: WorkDate,
              limit: 15,
              offset: 0,
            }),
            next: { revalidate: 5 },
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
  }, [WorkDate]);

  if (isLoading) {
    return (
      <div className="w-[125px] h-[125px] mx-auto mt-10">
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
    <section className="w-fit mx-auto relative overflow-hidden">
      <div className="sm:hidden flex items-start w-[350px] mx-auto overflow-y-hidden overflow-x-auto">
        <MobileTaskTblTop paramWorkDate={WorkDate} />

        {tasks.map((item, index) => {
          //Сформировать дату и время
          let b_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartOne
          )(item.begin_at as unknown as string);
          // TimeZoneDateToString(item.begin_at as unknown as string).split(
          //   " "
          // )[0];

          let t_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartTwo
          )(item.begin_at as unknown as string);
          //  TimeZoneDateToString(
          //   item.begin_at as unknown as string
          // ).split(" ")[1];

          let e_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartOne
          )(item.end_at as unknown as string);
          // TimeZoneDateToString(item.end_at as unknown as string).split(" ")[0];
          let et_date = MyPipeStr(
            TimeZoneDateToString,
            returnStrPartTwo
          )(item.end_at as unknown as string);

          // let et_date = TimeZoneDateToString(
          //   item.end_at as unknown as string
          // ).split(" ")[1];

          //Через группу
          const odd: boolean = index % 2 === 0;

          //Сформировать ссылку
          let aHref: string =
            "/tasks/" +
            MyPipeStr(
              TimeZoneDateToString,
              returnStrPartOne,
              ChangeDateItems
            )(item.begin_at as unknown as string);
          // ChangeDateItems(
          //   TimeZoneDateToString(item.begin_at as unknown as string).split(
          //     " "
          //   )[0]
          // );

          return (
            <div
              className={`grid grid-cols-[100px] auto-rows-[35px] text-[0.7rem] border-b-4 border-b-transparent ${
                !odd ? "bg-sky-100" : "bg-slate-50"
              }`}
              key={index}
            >
              <div className="overflow-hidden p-1 text-center align-middle">
                {index + 1}.
              </div>
              <div className="overflow-hidden p-1 align-middle hover:underline">
                <Link href={aHref} scroll={false}>
                  {item.name}
                </Link>
              </div>
              <div className="overflow-hidden p-1 align-middle">
                {b_date}{" "}
                <span className="text-[0.8rem] text-blue-900 font-bold">
                  {t_date}
                </span>
              </div>
              <div className="overflow-hidden p-1 align-middle">
                {e_date}{" "}
                <span className="text-[0.8rem] text-blue-900 font-bold">
                  {et_date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden sm:block overflow-y-auto overflow-x-hidden max-h-[53vh]">
        {/* Заголовок таблицы */}
        <TaskTblTop paramWorkDate={WorkDate} paramTasksCount={tasksCount} />
        <ul className="p-2 text-[0.7rem]">
          {tasks.map((item, index, array) => {
            let transp: number = 1;
            //Прозрачность позиции
            transp = CalculateOpacity(index, array.length);
            //Сформировать ссылку
            // let aHref: string =
            //   "/tasks/" +
            //   ChangeDateItems(
            //     TimeZoneDateToString(item.begin_at as unknown as string).split(
            //       " "
            //     )[0]
            //   );
            let aHref: string =
              "/tasks/" +
              MyPipeStr(
                TimeZoneDateToString,
                returnStrPartOne,
                ChangeDateItems
              )(item.begin_at as unknown as string);

            return (
              <li
                key={index}
                className="p-1 grid grid-cols-[25px_200px_120px_120px] gap-x-2 text-[0.8rem] odd:bg-sky-100"
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
                  {
                    // TimeZoneDateToString(
                    //   item.begin_at as unknown as string
                    // ).split(" ")[0]
                    MyPipeStr(
                      TimeZoneDateToString,
                      returnStrPartOne
                    )(item.begin_at as unknown as string)
                  }
                  <span className="text-[0.75rem] text-blue-900 font-bold">
                    {
                      // TimeZoneDateToString(
                      //   item.begin_at as unknown as string
                      // ).split(" ")[1]
                      MyPipeStr(
                        TimeZoneDateToString,
                        returnStrPartTwo
                      )(item.begin_at as unknown as string)
                    }
                  </span>
                </div>
                <div className="text-sky-800 text-[0.7rem] uppercase flex items-center gap-x-1">
                  {
                    // TimeZoneDateToString(
                    //   item.end_at as unknown as string
                    // ).split(" ")[0]
                    MyPipeStr(
                      TimeZoneDateToString,
                      returnStrPartOne
                    )(item.end_at as unknown as string)
                  }
                  <span className="text-[0.75rem] text-blue-900 font-bold">
                    {
                      // TimeZoneDateToString(
                      //   item.end_at as unknown as string
                      // ).split(" ")[1]
                      MyPipeStr(
                        TimeZoneDateToString,
                        returnStrPartTwo
                      )(item.end_at as unknown as string)
                    }
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
