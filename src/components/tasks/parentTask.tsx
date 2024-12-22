"use client";

import React, { memo, useState, useRef, useEffect } from "react";
import { ListTaskComponent } from "./listTaskComponent";
import { TskButton } from "./childTask";
import { DialogComponent, IDialog } from "../dialog/dialogComponent";
import { AddChildTaskForm } from "./addChildTaskForm";
import { useSession } from "next-auth/react";
import { isValue } from "@/utils/tasksFunctions";

type TParentTaskProps = {
  paramItem: Partial<TTask>;
  paramPage: string;
};

export const ParentTask: React.FC<TParentTaskProps> = memo((param) => {
  const { data: session } = useSession();
  const [hasChildren] = useState<boolean>(
    (param.paramItem.items && param.paramItem.items.length > 0) as boolean
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const dialogRef = useRef<IDialog>(null);
  const [isTypeDialog, setIsTypeDialog] = useState<TEnumForm>("addSubTask");

  const handleAddDialog = () => {
    setIsTypeDialog("addSubTask");
    setShowModal(true);
  };

  const handleCloseDialog = async () => {
    if (dialogRef.current) {
      if (dialogRef.current.isOpen) {
        await dialogRef.current.hide();
        setShowModal(false);
      }
    }
  };

  useEffect(() => {
    if (showModal) {
      if (!dialogRef.current?.isOpen) {
        dialogRef.current?.showModal();
      }
    } else {
      if (dialogRef.current?.isOpen) {
        //console.log("Закрываю!");
        dialogRef.current?.hide();
      }
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <DialogComponent paramClick={handleCloseDialog} ref={dialogRef}>
          {isTypeDialog === "addSubTask" && (
            <AddChildTaskForm
              paramItem={param.paramItem}
              paramTaskDay={param.paramPage}
              paramUser={session?.user.userId as string}
              paramClick={handleCloseDialog}
            />
          )}
        </DialogComponent>
      )}
      <div
        className="bg-sky-400 text-green-100 rounded-s-2xl p-2 text-[0.8rem] font-bold col-span-5 "
        style={{
          marginLeft:
            isValue(param.paramItem.level) &&
            (param.paramItem.level as number) > 0
              ? (param.paramItem.level as number) * 15
              : 0,
        }}
      >
        <div className="align-middle first-letter:uppercase flex items-center justify-between gap-x-2 gap-y-1 ">
          {param.paramItem.name?.trim()}
          <div className="flex flex-col sm:flex-row items-center justify-center p-1">
            <TskButton
              paramBgColor={"bg-sky-600"}
              paramTitle="Добавить подзадачу"
              paramText={"+"}
              paramClick={handleAddDialog}
            />
          </div>
        </div>
      </div>
      {/* Подзадачи */}
      <div>
        {hasChildren && (
          <ListTaskComponent
            paramList={param.paramItem.items as TTaskList}
            paramPage={param.paramPage}
          />
        )}
      </div>
    </>
  );
});
