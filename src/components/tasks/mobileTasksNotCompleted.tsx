import {
  ChangeDateItems,
  MyPipeStr,
  returnStrPartOne,
  returnStrPartTwo,
  TimeZoneDateToString,
} from "@/utils/functions";
import Link from "next/link";

function MobileTopTable() {
  return (
    <div className="sticky left-0 z-[2] grid grid-cols-[30px_60px] auto-rows-[35px] uppercase text-[0.6rem] font-semibold">
      <div className=" row-span-4 bg-red-300 text-black text-[0.7rem] vertical-text p-2 align-middle text-center tracking-[0.085em]">
        Просроченные
      </div>
      <div className="bg-red-500 text-white p-1 border-b border-b-white align-middle">
        N/N
      </div>
      <div className="bg-red-500 text-white p-1 border-b border-b-white align-middle">
        Наимен...
      </div>
      <div className="bg-red-500 text-white p-1 border-b border-b-white align-middle">
        старт
      </div>
      <div className="bg-red-500 text-white p-1 border-b-2 border-b-transparent align-middle">
        финиш
      </div>
    </div>
  );
}

export default function MobileTasksNotCompleted({
  paramTasks,
}: {
  paramTasks: TTaskList;
}) {
  return (
    <div className="w-[356px] mx-auto mt-4 sm:hidden overflow-x-auto overflow-y-hidden flex items-start relative">
      {/* Заголовок */}
      <MobileTopTable />
      {/* Данные */}
      {paramTasks &&
        paramTasks.length > 0 &&
        paramTasks.map((item, index) => {
          let aHref: string =
            "/tasks/" +
            MyPipeStr(
              TimeZoneDateToString,
              returnStrPartOne,
              ChangeDateItems
            )(item.begin_at as unknown as string);

          return (
            <div
              className="grid grid-cols-[100px] auto-rows-[35px] p-1 text-[0.7rem] align-middle odd:bg-red-50"
              key={item.id}
            >
              <div className="text-center p-1">{index + 1}.</div>
              <div className=" whitespace-nowrap overflow-hidden p-1">
                <Link href={aHref} scroll={false} className="hover:underline">
                  {item.name}
                </Link>
              </div>
              <div>
                <span className="text-[0.6rem]">
                  {MyPipeStr(
                    TimeZoneDateToString,
                    returnStrPartOne
                  )(item.begin_at as unknown as string)}
                </span>
                &nbsp;
                <span className="font-bold text-sky-700">
                  {MyPipeStr(
                    TimeZoneDateToString,
                    returnStrPartTwo
                  )(item.begin_at as unknown as string)}
                </span>
              </div>
              <div className="border-b-2 border-b-transparent">
                <span className="text-[0.6rem]">
                  {MyPipeStr(
                    TimeZoneDateToString,
                    returnStrPartOne
                  )(item.end_at as unknown as string)}
                </span>
                &nbsp;
                <span className="font-bold text-sky-700">
                  {MyPipeStr(
                    TimeZoneDateToString,
                    returnStrPartTwo
                  )(item.end_at as unknown as string)}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
