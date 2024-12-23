"use client";

import {
  MyPipeStr,
  TimeZoneDateToString,
  returnStrPartOne,
  returnStrPartTwo,
} from "@/utils/functions";
import { Selected_SVG } from "@/utils/svg-icons";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { DialogComponent, IDialog } from "../dialog/dialogComponent";
import { AddChildTaskForm } from "./addChildTaskForm";
import { DeleteTaskForm } from "./deleteTaskForm";
import { useSession } from "next-auth/react";
import { ChangeCompleted } from "@/server/actions";
import { isValue } from "@/utils/tasksFunctions";

type TTaskButtonParams = {
  paramText: string | React.JSX.Element;
  paramTitle: string;
  paramBgColor: string;
  paramClick?: () => void;
};

export const TskButton: React.FC<TTaskButtonParams> = memo(
  ({
    paramText,
    paramTitle,
    paramBgColor,
    paramClick,
  }: {
    paramText: string | React.JSX.Element;
    paramTitle: string;
    paramBgColor: string;
    paramClick?: () => void;
  }) => {
    return (
      <button
        type="button"
        className={`w-[26px] h-[26px] p-1 ${
          paramBgColor !== null && paramBgColor.trim() !== ""
            ? paramBgColor
            : "bg-sky-400"
        } text-white rounded-full scale-90 transition-shadow active:scale-90 hover:shadow-[0_0_4px_rgba(0,0,0,1)] hover:shadow-black`}
        title={paramTitle}
        onClick={(e) => (paramClick ? paramClick() : null)}
      >
        {paramText}
      </button>
    );
  }
);

type TChildTaskProps = {
  paramItem: Partial<TTask>;
  paramPage: string;
};

export const ChildTask: React.FC<TChildTaskProps> = memo((param) => {
  const { data: session } = useSession();

  const [completed] = useState<boolean>(param.paramItem.completed as boolean);

  const [canShowDialog, setCanShowDialog] = useState<boolean>(false);
  const [isAddelete, setIsAddDelete] = useState<TEnumForm>("addSubTask");

  const isDialogRef = useRef<IDialog>(null);

  const handleCompleted = async () => {
    //Проверка на задачу верхнего уровня
    if (isValue(param.paramItem.parent_id)) {
      //console.log("Это json задача", param.paramItem.parent_id);
      return;
    }
    //Изменить статус задачи
    param.paramItem.completed = !param.paramItem.completed;
    await ChangeCompleted(
      param.paramItem.completed,
      session?.user.userId as string,
      param.paramItem.id as string,
      param.paramPage
    );
    //setCompleted(paramItem.completed);
    //console.log(paramItem.id, paramItem.completed);
  };

  const handleAddDialog = () => {
    setIsAddDelete("addSubTask");
    setCanShowDialog(true);
  };

  const handleTaskDeleteDialog = () => {
    setIsAddDelete("deleteTask");
    setCanShowDialog(true);
  };

  const handleCloseDialog = async () => {
    if (isDialogRef.current) {
      if (isDialogRef.current.isOpen) {
        await isDialogRef.current.hide();
        setCanShowDialog(false);
      }
    }
  };

  useEffect(() => {
    if (canShowDialog) {
      if (!isDialogRef.current?.isOpen) {
        isDialogRef.current?.showModal();
      }
    } else {
      if (isDialogRef.current?.isOpen) {
        //console.log("Закрываю!");
        isDialogRef.current?.hide();
      }
    }
  }, [canShowDialog]);

  return (
    <>
      {canShowDialog && (
        <DialogComponent paramClick={handleCloseDialog} ref={isDialogRef}>
          {isAddelete === "addSubTask" && (
            <AddChildTaskForm
              paramItem={param.paramItem}
              paramUser={session?.user.userId as string}
              paramTaskDay={param.paramPage}
              paramClick={handleCloseDialog}
            />
          )}
          {isAddelete === "deleteTask" && (
            <DeleteTaskForm
              taskId={param.paramItem.id as string}
              userId={session?.user.userId}
              paramPage={param.paramPage}
              taskName={param.paramItem.name as string}
              closeClick={handleCloseDialog}
            />
          )}
        </DialogComponent>
      )}
      <li
        className={`grid grid-cols-5 gap-x-2 p-1 ${
          completed
            ? "bg-green-200 odd:bg-green-50"
            : "bg-sky-200 odd:bg-sky-50"
        }   text-[0.8rem]/[1rem]`}
        style={{
          marginLeft:
            isValue(param.paramItem.level) &&
            (param.paramItem.level as number) > 0
              ? (param.paramItem.level as number) * 12
              : 0,
        }}
      >
        <span className="align-middle p-1 line-clamp-4 first-letter:uppercase">
          {param.paramItem.name}
        </span>
        <span className="align-middle p-1 overflow-hidden whitespace-nowrap">
          {completed ? "Завершена" : "Не завершена"}
        </span>
        <span className=" text-[0.7rem] align-middle p-1">
          <span className=" whitespace-nowrap">
            {MyPipeStr(
              TimeZoneDateToString,
              returnStrPartOne
            )(param.paramItem.begin_at as unknown as string)}
          </span>{" "}
          <span className=" text-[0.8rem] font-bold align-middle p-1">
            {MyPipeStr(
              TimeZoneDateToString,
              returnStrPartTwo
            )(param.paramItem.begin_at as unknown as string)}
          </span>
        </span>
        <span className=" text-[0.7rem] align-middle p-1">
          <span className=" whitespace-nowrap">
            {MyPipeStr(
              TimeZoneDateToString,
              returnStrPartOne
            )(param.paramItem.end_at as unknown as string)}
          </span>{" "}
          <span className=" text-[0.8rem] font-bold align-middle p-1">
            {MyPipeStr(
              TimeZoneDateToString,
              returnStrPartTwo
            )(param.paramItem.end_at as unknown as string)}
          </span>
        </span>

        {/* Кнопки добавить удалить */}
        <div className="w-fit mx-auto grid grid-cols-1 md:flex items-start justify-center gap-x-2 gap-y-1 p-1">
          <TskButton
            paramText={<Selected_SVG pWidth={18} pHeight={18} />}
            paramTitle="Пометить"
            paramBgColor={completed ? "bg-green-600" : "bg-sky-600"}
            paramClick={handleCompleted}
          />
          <TskButton
            paramText="+"
            paramTitle="Добавить подзадачу"
            paramBgColor={"bg-sky-400"}
            paramClick={handleAddDialog}
          />
          <TskButton
            paramText="--"
            paramTitle="Удалить подзадачу"
            paramBgColor={"bg-red-300"}
            paramClick={handleTaskDeleteDialog}
          />
        </div>
      </li>
    </>
  );
});
