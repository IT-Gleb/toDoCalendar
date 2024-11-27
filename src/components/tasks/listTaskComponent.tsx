import React from "react";
import { ParentTask } from "./parentTask";
import { ChildTask } from "./childTask";

export const ListTaskComponent = ({ paramList }: { paramList: TTaskList }) => {
  return (
    <div className="xl:grid xl:grid-cols-5 gap-y-2 gap-x-2">
      {paramList &&
        paramList.length &&
        paramList.map((item) => {
          const isParent: boolean =
            Array.isArray(item.items) && item.items.length > 0;

          if (isParent) {
            return <ParentTask key={item.id} paramItem={item} />;
          } else {
            return <ChildTask key={item.id} paramItem={item} />;
          }
        })}
    </div>
  );
};
