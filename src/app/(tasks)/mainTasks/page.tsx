"use client";

import { NoAuthComponent } from "@/components/noAuthComponent";
import { Base_URL } from "@/utils/functions";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";

type TNotAuth = {
  status: number;
  message: string;
};

function isNoAuthType(param: any): boolean {
  if (typeof param === "object") {
    if ("status" in param && "message" in param) {
      return true;
    }
  }
  return false;
}

async function getData(paramToken: string) {
  const url: string = Base_URL + "api/items";

  let data: any = null;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${paramToken}`,
    },
    next: { tags: ["tasks"] },
  });

  console.log("Первый ответ: ", response);
  //console.log(await response.json());
  data = await response.json();
  console.log("Второй ответ: ", data);
  // if (response.ok) {
  //   data = await response.json();
  // }

  return data;
}

function getArrayTasks(paramItem: TTask): TTaskList {
  const result: TTaskList = [];
  const queue: TTaskList = [paramItem];

  while (queue.length > 0) {
    let item: Partial<TTask> | undefined = queue.pop();

    if (!item) {
      continue;
    }

    if (item) {
      result.push(item);
      if (typeof item.items === "object" && item.items !== null) {
        item.items.forEach((item: Partial<TTask>) => {
          // console.log(item);
          queue.push(item);
        });
      }
    }
  }

  return result;
}

export default function AllTasks() {
  //Авторизация
  const { data: session, status } = useSession();
  if (status === "loading" || status === "unauthenticated") {
    return <NoAuthComponent />;
  }
  //---------------------------
  const [data, setData] = useState<TTaskList | TNotAuth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TTaskList>([]);

  useEffect(() => {
    let isSubscribed: boolean = true;
    if (isSubscribed) {
      (async function (paramIsLoad: (p: boolean) => void) {
        paramIsLoad(true);
        try {
          const res = await fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: session?.user.name,
              role: session?.user.role,
              id: session?.user.userId,
            }),
            next: { tags: ["tasks"] },
          });
          if (res.ok) {
            const data = await res.json();
            const tt: TTaskList = [];
            data.forEach((item: any) => {
              const temp: Partial<TTask> = { ...item };
              temp.userId = item.userid;
              tt.push(temp);
            });
            setData(tt);
          } else {
            setData({ message: "Error!!!", status: 404 });
          }
        } catch (err) {
          setData({ message: (err as Error).message, status: 404 });
        } finally {
          paramIsLoad(false);
        }
      })(setIsLoading);
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    //setIsLoading(true);
    if (data && Array.isArray(data) && data.length > 0) {
      //console.log(data);
      const ttask: TTaskList = [];
      data.forEach((item) => {
        const dt = { ...item };
        getArrayTasks(dt as TTask).forEach((task) => ttask.push(task));
      });
      if (ttask.length > 0) {
        setTasks(ttask);
      }
    }
    //setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return (
      <section className="w-fit mx-auto mt-10">
        <h4 className="text-[1.8rem] font-semibold">
          Идет загрузка и обработка данных...
        </h4>
      </section>
    );
  }

  return (
    <div className="w-fit mx-auto mt-10">
      {data && isNoAuthType(data) && (
        <div>
          <h2>{(data as TNotAuth).status}</h2>
          <p>{(data as TNotAuth).message}</p>
        </div>
      )}
      {data && Array.isArray(data) && data.length < 1 && <h2>Нет данных</h2>}
      <div className="relative max-h-[75vh] rounded-md bg-gradient-to-b from-slate-100 via-transparent to-slate-100 overflow-y-auto">
        {/* Заголовок таблицы */}
        {tasks && tasks.length > 0 && (
          <div className=" sticky top-0.5 left-0 bg-slate-400 rounded-md text-center flex gap-x-1 items-center p-1 font-semibold text-[0.7rem] uppercase border-r-4 border-r-transparent">
            <div className="w-[30px] p-2 bg-slate-300 text-black overflow-hidden">
              id
            </div>
            <div className="w-[40px] p-2 bg-slate-300 text-black overflow-hidden whitespace-nowrap">
              p_id
            </div>
            <div className="w-[40px] p-2 bg-slate-300 text-black overflow-hidden whitespace-nowrap">
              u-id
            </div>
            <div className="w-[200px] p-2 bg-slate-300 text-black overflow-hidden">
              наименование
            </div>
            <div className="w-[100px] p-2 bg-slate-300 text-black overflow-hidden">
              статус
            </div>
          </div>
        )}
        {/* Данные по задачам */}
        {tasks &&
          tasks.length > 0 &&
          tasks.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index === 0 ? "mt-2" : "mt-1"
              } text-[0.8rem] text-left bg-slate-300 rounded-md flex gap-x-1 items-start p-1`}
            >
              <div className="w-[30px] bg-slate-50 p-2">{item.id}</div>
              <div className="w-[40px] bg-slate-50 p-2">
                {item.parent_id !== null ? item.parent_id : "0"}
              </div>
              <div className="w-[40px] bg-slate-50 p-2">{item.userId}</div>
              <div className="w-[200px]  overflow-hidden text-left bg-slate-50 p-2 whitespace-nowrap">
                {item.name}
              </div>
              <div className="w-[100px] overflow-hidden text-left bg-slate-50 p-2 whitespace-nowrap">
                {item.completed ? "Завершена" : "Не завершена"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
