"use client";

import React, { memo, useState, useRef, useEffect } from "react";
import { ListTaskComponent } from "./listTaskComponent";
import { TskButton } from "./childTask";
import { DialogComponent, IDialog } from "../dialog/dialogComponent";
import { AddChildTaskForm } from "./addChildTaskForm";
import { useSession } from "next-auth/react";
import { isValue } from "@/utils/tasksFunctions";
import {
  MyPipeStr,
  PopoverUp,
  TimeZoneDateToString,
  cryptId,
  returnStrPartOne,
  returnStrPartTwo,
} from "@/utils/functions";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { ArrowDown_SVG, ArrowRight_SVG, Plus_SVG } from "@/utils/svg-icons";
import { DeleteTaskForm } from "./deleteTaskForm";
import { nanoid } from "nanoid";
import { addItemTask } from "@/server/actions";

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
  const [aRef, animate] = useAnimate();
  const [isOpenChild, setOpenChild] = useState<boolean>(true); //Раскрыто по умолчанию

  const handleAddDialog = () => {
    setIsTypeDialog("addSubTask");
    setShowModal(true);
  };

  const handleDeleteTask = () => {
    setIsTypeDialog("deleteTask");
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

  //Вставить из Clipboard
  const handlePaste = async () => {
    let txt: string = "";
    try {
      txt = await navigator.clipboard.readText();
      const data: TPastTask = JSON.parse(txt) as TPastTask;
      if ("type" in data && typeof data == "object" && data.type === "task") {
        const task: Partial<TTask> = Object.assign({}, data.data);
        task.parent_id = param.paramItem.id;
        task.id = nanoid();
        task.maintask = param.paramItem.maintask;
        task.level = (param.paramItem.level as number) + 1;
        task.completed = false;

        const isJson: boolean =
          typeof task.parent_id === "string" && task.parent_id.length > 5;

        const taskmData = new FormData();
        taskmData.append("maintask", task.maintask as string);
        taskmData.append("pId", task.parent_id as string);
        taskmData.append("taskId", task.id as string);
        taskmData.append("user", cryptId(task.userId as unknown as string));
        taskmData.append("nameTask", task.name as string);
        taskmData.append("begin", task.begin_at as unknown as string);
        taskmData.append("end", task.end_at as unknown as string);
        taskmData.append("completed", task.completed ? "true" : "false");
        taskmData.append("level", task.level as unknown as string);

        taskmData.append("taskDay", param.paramPage as string);
        taskmData.append("jsonTask", isJson ? "true" : "false");

        //console.log(taskmData, isJson);
        const initRes: "init" | "success" | "error" = "init";

        const result = await addItemTask(initRes, taskmData);
        if (result === "error") {
          throw new Error("Ошибка вставки данных в таблицу!");
        }
      } else {
        throw new Error("Ошибка!");
      }
      setTimeout(() => {
        PopoverUp({
          param: "Задача вставлена из буфера обмена!",
          isError: false,
        });
      }, 1500);
    } catch (err) {
      //console.error((err as Error).message);
      PopoverUp({
        param:
          "Неверный формат данных! Не могу вставить задачу... 8-( " +
          (err as Error).message,
        isError: true,
      });
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

  //Открыть закрыть субзадачи
  const handleOpenClose = () => {
    setOpenChild((prev) => !prev);
  };

  useEffect(() => {
    if (isOpenChild) {
      animate(
        aRef.current,
        {
          y: [-20, 0],
          height: [0, "auto"],
          opacity: [0, 1],
        },
        { ease: "easeOut" }
      );
    }
  }, [isOpenChild]);
  //-----------------------------------
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
          {isTypeDialog === "deleteTask" && (
            <DeleteTaskForm
              userId={session?.user.userId as string}
              taskId={param.paramItem.id as string}
              parentId={param.paramItem.parent_id as string}
              mainTask={param.paramItem.maintask as string}
              taskName={param.paramItem.name as string}
              paramPage={param.paramPage}
              closeClick={handleCloseDialog}
            />
          )}
        </DialogComponent>
      )}
      <li>
        <div
          className={`${
            param.paramItem.completed
              ? "bg-green-400 even:bg-green-300 text-sky-800"
              : "bg-sky-200 odd:bg-sky-300 text-slate-800"
          } text-[0.6em] sm:text-[0.7rem] font-bold col-span-5 ${
            isOpenChild ? "" : "border-b border-b-slate-500"
          } `}
          style={{
            marginLeft:
              isValue(param.paramItem.level) &&
              (param.paramItem.level as number) > 0
                ? (param.paramItem.level as number) * 8
                : 0,
          }}
        >
          <div className="pl-2 align-middle first-letter:uppercase flex items-center justify-between gap-x-2 gap-y-1 ">
            <span className=" line-clamp-2 max-w-[300px]">
              {param.paramItem.name?.trim()}
            </span>
            <span className="overflow-hidden max-w-[100px]">
              {param.paramItem.completed ? "OK" : "Не завершена"}
            </span>
            <span className="max-w-[120px]">
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartOne
              )(param.paramItem.begin_at as unknown as string)}{" "}
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartTwo
              )(param.paramItem.begin_at as unknown as string)}
            </span>
            <span className="max-w-[120px]">
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartOne
              )(param.paramItem.end_at as unknown as string)}{" "}
              {MyPipeStr(
                TimeZoneDateToString,
                returnStrPartTwo
              )(param.paramItem.end_at as unknown as string)}
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-x-2 p-1 min-w-[100px]">
              <TskButton
                paramBgColor={"bg-stone-400"}
                paramTitle="Открыть/Закрыть"
                paramText={isOpenChild ? <ArrowDown_SVG /> : <ArrowRight_SVG />}
                paramClick={handleOpenClose}
                paramDisabled={false}
              />
              <TskButton
                paramBgColor={"bg-stone-400"}
                paramTitle="Добавить подзадачу"
                paramText={<Plus_SVG pHeight={14} pWidth={14} />}
                paramClick={handleAddDialog}
                paramDisabled={param.paramItem.completed === true}
              />
              <TskButton
                paramBgColor={"bg-purple-400"}
                paramTitle="Вставить подзадачу"
                paramText={"p"}
                paramClick={handlePaste}
                paramDisabled={false}
              />
              <TskButton
                paramBgColor={"bg-rose-300"}
                paramTitle="Удалить задачу"
                paramText={"--"}
                paramClick={handleDeleteTask}
                paramDisabled={param.paramItem.completed === true}
              />
            </div>
          </div>
        </div>
        {/* Подзадачи */}

        {hasChildren && (
          <AnimatePresence>
            {isOpenChild && (
              <motion.div
                ref={aRef}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: 0,
                  transition: { ease: "easeIn" },
                }}
              >
                <ListTaskComponent
                  paramList={param.paramItem.items as TTaskList}
                  paramPage={param.paramPage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </li>
    </>
  );
});
