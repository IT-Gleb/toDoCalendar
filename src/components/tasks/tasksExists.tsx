"use client";

import { CalculateOpacity, TimeZoneDateToString } from "@/utils/functions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TrackerDay from "./trackerDay";

type TResponseError = {
  status: string;
  message: string;
};

export default function TasksExists() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<TTaskList | TResponseError>([]);
  const [day, setDay] = useState<string>("2024-11-29");

  //Запрос на задачи
  useEffect(() => {
    (async function getExistsTasks() {
      const url: string = "/api/checklast10";
      const result = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          id: session?.user.userId,
          day,
          limit: 15,
        }),
        next: { revalidate: 5 },
      });
      if (result.ok) {
        const existsTasks = await result.json();
        if (existsTasks) {
          setTasks(existsTasks);
        }
      }
    })();
  }, [day]);

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
      <TrackerDay />
      <div className=" overflow-y-auto max-h-[55vh]">
        {/* "Заголовок таблицы" */}
        <div className="sticky top-0 z-[2] grid grid-cols-[20px_200px_120px_120px] gap-x-2 uppercase text-[0.75rem] text-slate-500 font-bold text-center bg-gradient-to-b from-sky-300 to-sky-100">
          <div className=" col-span-4 p-1 flex flex-wrap items-center justify-center gap-x-2">
            Задачи на выполнение, от даты:{" "}
            <span className="text-[1rem] text-slate-700">{day}</span>
          </div>
          <div className="p-1 text-slate-600">N/N</div>
          <div className="p-1 text-slate-600 overflow-hidden">Наименование</div>
          <div className="p-1 text-slate-600 overflow-hidden">Начинается</div>
          <div className="p-1 text-slate-600 overflow-hidden">
            Заканчивается
          </div>
        </div>
        <ul className="p-2 text-[0.7rem]">
          {tasks.map((item, index, array) => {
            let transp: number = 1;

            transp = CalculateOpacity(index, array.length);

            return (
              <li
                key={index}
                className="p-1 grid grid-cols-[20px_200px_120px_120px] gap-x-2 text-[0.8rem]"
                style={{ opacity: transp }}
              >
                {index + 1}.
                <Link href={"/"} scroll={false} className="hover:underline">
                  {item.name}
                </Link>
                <div className="text-sky-800 text-[0.7rem] uppercase flex items-center gap-x-1">
                  {
                    TimeZoneDateToString(
                      item.begin_at as unknown as string
                    ).split(" ")[0]
                  }
                  <span className="text-[0.9rem] text-blue-900 font-bold">
                    {
                      TimeZoneDateToString(
                        item.begin_at as unknown as string
                      ).split(" ")[1]
                    }
                  </span>
                </div>
                <div className="text-sky-800 text-[0.7rem] uppercase flex items-center gap-x-1">
                  {
                    TimeZoneDateToString(
                      item.end_at as unknown as string
                    ).split(" ")[0]
                  }
                  <span className="text-[0.9rem] text-blue-900 font-bold">
                    {
                      TimeZoneDateToString(
                        item.end_at as unknown as string
                      ).split(" ")[1]
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
