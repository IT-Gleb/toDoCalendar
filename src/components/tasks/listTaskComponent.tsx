import React, { memo } from "react";
import { ParentTask } from "./parentTask";
import { ChildTask } from "./childTask";
import { SortTaskByBeginAt } from "@/utils/tasksFunctions";

export const ListTableHead: React.FC = memo(() => {
  return (
    <div className=" sticky top-0 z-[2] grid grid-cols-5 gap-x-2 bg-sky-600 text-white font-bold text-[0.7rem] uppercase">
      <div className="border-r border-white p-2 overflow-hidden">
        Наименование
      </div>
      <div className="border-r border-white p-2 overflow-hidden">статус</div>
      <div className="border-r border-white p-2 overflow-hidden">Старт</div>
      <div className="border-r border-white p-2 overflow-hidden">финиш</div>
      <div className="p-2 overflow-hidden">Действия</div>
    </div>
  );
});

export const ListTaskComponent = memo(
  ({ paramList, paramPage }: { paramList: TTaskList; paramPage: string }) => {
    // console.log(paramPage);
    return (
      <>
        {paramList && paramList.length < 1 && (
          <div className="w-fit mx-auto p-2 text-[1rem] md:text-[1.5rem] text-sky-500 font-bold uppercase">
            у вас нет задач на эту дату.
          </div>
        )}

        {paramList && paramList.length > 0 && (
          <ul className="p-1">
            {paramList.sort(SortTaskByBeginAt).map((item) => {
              const isParent: boolean =
                Array.isArray(item.items) && item.items.length > 0;
              //console.log(item.items);

              if (isParent) {
                return (
                  <ParentTask
                    key={(item.id as string) + Math.round(125)}
                    paramItem={item}
                    paramPage={paramPage}
                  />
                );
              } else {
                return (
                  <ChildTask
                    key={(item.id as string) + Math.round(345)}
                    paramItem={item}
                    paramPage={paramPage}
                  />
                );
              }
            })}
          </ul>
        )}
      </>
    );
  }
);
