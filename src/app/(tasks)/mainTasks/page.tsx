import { Base_URL } from "@/utils/functions";
import Link from "next/link";

async function getData() {
  const url: string = Base_URL + "api/items";

  const response = await fetch(url, {
    next: { tags: ["tasks"] },
  });
  let data = null;
  if (response.ok) {
    data = await response.json();
  }

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

export default async function AllTasks() {
  let tasks: TTaskList = [];
  let value = await getData();
  //console.log(value);
  let data: any = {};
  if (value && value.length > 0) {
    value.forEach((item: TTask) => {
      data = Object.assign({}, item);
      getArrayTasks(data).forEach((item) => tasks.push(item));
    });
    value = null;
  } else {
    return (
      <section className="w-fit mx-auto mt-5">
        <h2>Нет данных</h2>
      </section>
    );
  }

  return (
    <>
      <section>
        <h2 className="w-fit mx-auto mt-5 uppercase">задачи</h2>
      </section>
      {/* <section className="w-fit mx-auto mt-5 flex gap-x-2">
      {data &&
        Object.keys(data).map((item, index) => (
          <div key={index}>
            {`${item} : ${data[item as keyof typeof data]}`}
          </div>
        ))}
    </section> */}
      <section className="mt-5">
        <div className="w-fit mx-auto grid grid-cols-[80px_140px_200px_100px_150px_150px_150px] gap-x-4 bg-sky-700 text-white text-[0.7rem] uppercase font-bold p-2">
          <div>
            <span>id </span>
          </div>
          <div>
            <span>parent_id </span>
          </div>
          <div>
            <span>Наименование </span>
          </div>
          <div>
            <span>Завершена </span>
          </div>
          <div>
            <span>Создана </span>
          </div>
          <div>
            <span>Начата </span>
          </div>
          <div>
            <span>Закончена </span>
          </div>
        </div>

        {tasks &&
          tasks.length > 0 &&
          tasks.map((item) => (
            <div
              key={item.id}
              className="w-fit mx-auto grid grid-cols-[80px_140px_200px_100px_150px_150px_150px] gap-x-4 px-4 odd:bg-slate-100 text-[0.8rem] p-1"
            >
              <div className=" grid grid-cols-1 overflow-hidden">{item.id}</div>
              <div className=" grid grid-cols-1 overflow-hidden">
                {item.parent_id}
              </div>
              <div className=" grid grid-cols-1 ">{item.name}</div>
              <div className=" grid grid-cols-1 ">
                {item.completed ? "Да" : "Нет"}
              </div>
              <div className=" grid grid-cols-1 ">
                {new Date(item.create_at as number).toString()}
              </div>
              <div className=" grid grid-cols-1 ">
                {item.begin_at !== null
                  ? new Date(item.begin_at as number).toString()
                  : "Нет данных"}
              </div>
              <div className=" grid grid-cols-1 ">
                {item.end_at !== null
                  ? new Date(item.end_at as number).toString()
                  : "Нет данных"}
              </div>
            </div>
          ))}
      </section>
      <section className="w-full p-2 mt-5 flex items-center justify-center">
        <Link
          href="/"
          scroll={false}
          className="w-[120px] min-h-[20px] p-1 bg-slate-500 text-white text-center rounded-sm"
        >
          Вернуться
        </Link>
      </section>
    </>
  );
}
