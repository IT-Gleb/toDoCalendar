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

type TTaskButtonParams = {
  paramText: string | React.JSX.Element;
  paramTitle: string;
  paramBgColor: string;
  paramClick?: () => void;
};

const TskButton: React.FC<TTaskButtonParams> = memo(
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
        } text-white rounded-full active:scale-75`}
        title={paramTitle}
        onClick={(e) => (paramClick ? paramClick() : null)}
      >
        {paramText}
      </button>
    );
  }
);

type TEnumForm = "addSubTask" | "deleteTask";

export const ChildTask = memo(
  ({
    paramItem,
    paramPage,
  }: {
    paramItem: Partial<TTask>;
    paramPage: string;
  }) => {
    const { data: session } = useSession();

    const [completed] = useState<boolean>(paramItem.completed as boolean);

    const [canShowDialog, setCanShowDialog] = useState<boolean>(false);
    const [isAddelete, setIsAddDelete] = useState<TEnumForm>("addSubTask");

    const isDialogRef = useRef<IDialog>(null);

    const handleCompleted = async () => {
      //Изменить статус задачи
      paramItem.completed = !paramItem.completed;
      await ChangeCompleted(
        paramItem.completed,
        session?.user.userId as string,
        paramItem.id as string,
        paramPage
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
                paramItem={paramItem}
                paramClick={handleCloseDialog}
              />
            )}
            {isAddelete === "deleteTask" && (
              <DeleteTaskForm
                taskId={paramItem.id as string}
                userId={session?.user.userId}
                paramPage={paramPage}
                taskName={paramItem.name as string}
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
        >
          <span className="align-middle p-1 line-clamp-4">
            {paramItem.name}
          </span>
          <span className="align-middle p-1 overflow-hidden whitespace-nowrap">
            {completed ? "Завершена" : "Не завершена"}
          </span>
          <span className=" text-[0.7rem] align-middle p-1">
            <span className=" whitespace-nowrap">
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartOne
              )(paramItem.begin_at as unknown as string)}
            </span>{" "}
            <span className=" text-[0.8rem] font-bold align-middle p-1">
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartTwo
              )(paramItem.begin_at as unknown as string)}
            </span>
          </span>
          <span className=" text-[0.7rem] align-middle p-1">
            <span className=" whitespace-nowrap">
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartOne
              )(paramItem.end_at as unknown as string)}
            </span>{" "}
            <span className=" text-[0.8rem] font-bold align-middle p-1">
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartTwo
              )(paramItem.end_at as unknown as string)}
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
  }
);
