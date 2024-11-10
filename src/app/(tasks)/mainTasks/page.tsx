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
      (async function (param: (p: boolean) => void) {
        param(true);
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
            setData(data as TTaskList);
          } else {
            setData({ message: "Error!!!", status: 404 });
          }
        } catch (err) {
          setData({ message: (err as Error).message, status: 404 });
        } finally {
          param(false);
        }
      })(setIsLoading);
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return (
      <section className="w-fit mx-auto mt-10">
        <h4 className="text-[1.8rem] font-semibold">Идет загрузка данных...</h4>
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
      {tasks &&
        tasks.length > 0 &&
        tasks.map((item) => (
          <div
            key={item.id}
            className=" mt-1 text-[0.8rem] text-left bg-slate-400 rounded-md flex gap-x-1 items-start p-1"
          >
            <div className="w-[30px] bg-slate-50 p-2">{item.id}</div>
            <div className="w-[30px] bg-slate-50 p-2">
              {item.parent_id !== null ? item.parent_id : "0"}
            </div>
            <div className="w-[30px] bg-slate-50 p-2">{item.userId}</div>
            <div className="w-[200px]  overflow-hidden text-left bg-slate-50 p-2 whitespace-nowrap">
              {item.name}
            </div>
            <div className="w-[100px] overflow-hidden text-left bg-slate-50 p-2 whitespace-nowrap">
              {item.completed ? "Завершена" : "Не завершена"}
            </div>
          </div>
        ))}
    </div>
  );

  //Авторизация
  //const session = await auth();
  //if (!session) return <NoAuthComponent />;
  // let tasks: TTaskList = [];
  // let errData: TNotAuth = { status: 0, message: "" };
  // let data: any = null;
  //let value = await getData(session?.user.userId as string);
  // //Если ошибка
  // if (!Array.isArray(value)) {
  //   errData = { ...value };
  // }
  //--------------------
  // if (value && value.length > 0) {
  //   value.forEach((item: TTask) => {
  //     data = { ...item };
  //     getArrayTasks(data).forEach((item) => tasks.push(item));
  //   });
  //   value = null;
  // } else {
  //   return (
  //     <section className="w-fit mx-auto mt-5">
  //       <h2>Нет данных</h2>
  //       {errData.status > 0 && (
  //         <div className="mt-10 w-fit mx-auto">
  //           <h3 className=" font-semibold text-[1.6rem]">
  //             Ошибка получения данных
  //           </h3>
  //           <p className="mt-5">
  //             {errData.message}. Статус: {errData.status}
  //           </p>
  //         </div>
  //       )}
  //     </section>
  //   );
  // }
  //   return (
  //     <>
  //       <section>
  //         <h2 className="w-fit mx-auto mt-5 uppercase">задачи</h2>
  //       </section>
  //       {/* <section className="w-fit mx-auto mt-5 flex gap-x-2">
  //       {data &&
  //         Object.keys(data).map((item, index) => (
  //           <div key={index}>
  //             {`${item} : ${data[item as keyof typeof data]}`}
  //           </div>
  //         ))}
  //     </section> */}
  //       <section className="mt-5">
  //         <div className="w-fit mx-auto grid grid-cols-[80px_140px_200px_100px_150px_150px_150px] gap-x-4 bg-sky-700 text-white text-[0.7rem] uppercase font-bold p-2">
  //           <div>
  //             <span>id </span>
  //           </div>
  //           <div>
  //             <span>parent_id </span>
  //           </div>
  //           <div>
  //             <span>Наименование </span>
  //           </div>
  //           <div>
  //             <span>Завершена </span>
  //           </div>
  //           <div>
  //             <span>Создана </span>
  //           </div>
  //           <div>
  //             <span>Начата </span>
  //           </div>
  //           <div>
  //             <span>Закончена </span>
  //           </div>
  //         </div>
  //         {tasks &&
  //           tasks.length > 0 &&
  //           tasks.map((item) => (
  //             <div
  //               key={item.id}
  //               className="w-fit mx-auto grid grid-cols-[80px_140px_200px_100px_150px_150px_150px] gap-x-4 px-4 odd:bg-slate-100 text-[0.8rem] p-1"
  //             >
  //               <div className=" grid grid-cols-1 overflow-hidden">{item.id}</div>
  //               <div className=" grid grid-cols-1 overflow-hidden">
  //                 {item.parent_id}
  //               </div>
  //               <div className=" grid grid-cols-1 ">{item.name}</div>
  //               <div className=" grid grid-cols-1 ">
  //                 {item.completed ? "Да" : "Нет"}
  //               </div>
  //               <div className=" grid grid-cols-1 ">
  //                 {new Date(item.create_at as number).toString()}
  //               </div>
  //               <div className=" grid grid-cols-1 ">
  //                 {item.begin_at !== null
  //                   ? new Date(item.begin_at as number).toString()
  //                   : "Нет данных"}
  //               </div>
  //               <div className=" grid grid-cols-1 ">
  //                 {item.end_at !== null
  //                   ? new Date(item.end_at as number).toString()
  //                   : "Нет данных"}
  //               </div>
  //             </div>
  //           ))}
  //       </section>
  //       <section className="w-full p-2 mt-5 flex items-center justify-center">
  //         <Link
  //           href="/"
  //           scroll={false}
  //           className="w-[120px] min-h-[20px] p-1 bg-slate-500 text-white text-center rounded-sm"
  //         >
  //           Вернуться
  //         </Link>
  //       </section>
  //     </>
  //   );
}
