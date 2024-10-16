"use client";

import React, { useState } from "react";
import { ListTaskComponent } from "./listTaskComponent";

export const ParentTask = ({ paramItem }: { paramItem: Partial<TTask> }) => {
  const [hasChildren] = useState<boolean>(
    (paramItem.items && paramItem.items.length > 0) as boolean
  );

  return (
    <>
      <div>{paramItem.name}-[Parent]</div>);
      {hasChildren && (
        <ListTaskComponent paramList={paramItem.items as TTaskList} />
      )}
    </>
  );
};
