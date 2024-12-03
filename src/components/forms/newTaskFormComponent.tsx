"use client";

import React, { FocusEvent, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { newTaskAction } from "@/server/actions";
import { CurrentDateToInput, DateAddMinutesToInput } from "@/utils/functions";
import { FormSubmitButtonComponent } from "../buttons/formSubmitButtonComponent";
import { useFormState } from "react-dom";
import { MainMenu } from "@/utils/data";

type TFormItem = {
  title: string;
  name: string;
  active: boolean;
};

type TFormItems = TFormItem[];

const taskName: string = "Новая задача::верхнего уровня";
const formItems: TFormItems = [
  { title: "Наименование:", name: "nameTask", active: false },
  { title: "Начинается:", name: "beginDate", active: false },
  { title: "Заканчивается:", name: "endDate", active: false },
  { title: "Статус завершения", name: "status", active: false },
];

const InitialState: TFormState = {
  status: false,
  messages: {
    name: "",
    beginDate: "",
    endDate: "",
    completed: "",
    status: "",
    success: "",
  },
};

export const NewTaskFormComponent = () => {
  const [isActive, setIsActive] = useState<boolean[]>([]);
  const thisrouter = useRouter();
  const [state, formAction] = useFormState(
    newTaskAction,
    InitialState,
    "/mainTasks"
  );
  const [date1, setDate1] = useState<string>(CurrentDateToInput());
  const formRef = useRef<HTMLFormElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const isActived: boolean[] = formItems.reduce((acc: boolean[], curr) => {
      curr.active =
        curr.name.trim().toLowerCase() ===
        event.currentTarget.name.trim().toLowerCase()
          ? true
          : false;
      return [...acc, curr.active];
    }, []);

    setIsActive(isActived);
  };

  const handleBlur = () => {
    let isFalse: boolean[] = formItems.reduce((acc: boolean[], curr) => {
      curr.active = false;
      return [...acc, curr.active];
    }, []);

    setIsActive(isFalse);
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    thisrouter.push(MainMenu[1].href, { scroll: false });
  };

  useEffect(() => {
    //console.log(state.status);
    let isSubscribed: boolean = true;
    if (isSubscribed) {
      if (state.status) {
        formRef.current?.reset();
        thisrouter.push(MainMenu[1].href, { scroll: false });
      }
      if (!state.status) {
        let msg: string = "Error: ";
        Object.values(state.messages).forEach((item: string) => {
          msg += item + "#";
        });
        setErrorMsg(msg);
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="w-full mt-5">
      <fieldset className="w-full bg-white border p-4 flex flex-col gap-y-4">
        <legend className="uppercase px-1 flex flex-wrap items-center justify-center">
          {taskName.split("::")[0]}{" "}
          <span className="text-[0.7rem] font-bold">
            --{taskName.split("::")[1]}--
          </span>
        </legend>
        <label
          title={`${formItems[0].title}`}
          className={`flex flex-col gap-y-1 p-1 relative border  ${
            isActive[0]
              ? "border-sky-600 before:text-sky-600 before:animate-bounce"
              : "border-slate-300 before:text-black"
          }
          before:content-[attr(title)] before:absolute before:text-[0.7rem] before:left-2 before:-top-2 before:bg-white before:px-1`}
        >
          {/* <span>{labelname1}</span> */}
          <input
            type="text"
            name={formItems[0].name}
            id="name1"
            maxLength={120}
            placeholder="Введите"
            required
            autoComplete="off"
            className="p-1 text-[0.9rem] outline-none placeholder:text-[0.85rem] placeholder:text-slate-400"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </label>
        <label
          title={`${formItems[1].title}`}
          className={`flex flex-col gap-y-1 p-1 relative border ${
            isActive[1]
              ? "border-sky-600 before:text-sky-600 before:animate-bounce"
              : "border-slate-300 before:text-black"
          } 
          before:content-[attr(title)] before:absolute before:text-[0.7rem] before:left-2 before:-top-2 before:text-black before:bg-white before:px-1`}
        >
          {/* <span>{labelname1}</span> */}
          <input
            type="datetime-local"
            className="p-1 text-[0.9rem] outline-none "
            name={formItems[1].name}
            value={date1}
            onChange={(e) => setDate1(e.currentTarget.value)}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </label>
        <label
          title={`${formItems[2].title}`}
          className={`flex flex-col gap-y-1 p-1 relative border ${
            isActive[2]
              ? "border-sky-600 before:text-sky-600 before:animate-bounce"
              : "border-slate-300 before:text-black"
          } 
          before:content-[attr(title)] before:absolute before:text-[0.7rem] before:left-2 before:-top-2 before:text-black before:bg-white before:px-1`}
        >
          {/* <span>{labelname1}</span> */}
          <input
            type="datetime-local"
            className="p-1 text-[0.9rem] outline-none "
            name={formItems[2].name}
            defaultValue={DateAddMinutesToInput(Number(Date.now()), 30)}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </label>
        <label
          title={formItems[3].title}
          className={`flex flex-col gap-y-1 p-1 relative border ${
            isActive[3]
              ? "border-sky-600 before:text-sky-600 before:animate-bounce"
              : "border-slate-300 before:text-black"
          } 
                  before:content-[attr(title)] before:absolute before:text-[0.7rem] before:left-2 before:-top-2 before:text-black before:bg-white before:px-1`}
        >
          <div className="flex gap-x-4 w-fit mx-auto p-4">
            <label className=" cursor-pointer flex gap-x-2 text-[0.6rem] uppercase">
              <input
                type="radio"
                name={formItems[3].name}
                id="radio1"
                defaultValue={1}
                defaultChecked
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <span>Не завершена</span>
            </label>
            <label className=" cursor-pointer flex gap-x-2 text-[0.6rem] uppercase">
              <input
                type="radio"
                name={formItems[3].name}
                id="radio2"
                defaultValue={0}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <span>Завершена</span>
            </label>
          </div>
        </label>
        <div
          className={`${
            state.status ? "bg-green-600" : "bg-red-600"
          }  text-white first-letter:uppercase indent-4`}
        >
          {state.status ? state.messages["success"] : errorMsg}
        </div>
        <div className="mt-5 flex items-end justify-end flex-wrap gap-x-4 gap-y-4">
          <button
            type="button"
            className="w-[120px] min-h-[30px] p-2 rounded-lg bg-slate-300 text-white text-[0.85rem] active:scale-90 active:translate-y-1 hover:shadow-md hover:-translate-y-1 hover:bg-slate-600"
            onClick={handleCancel}
          >
            Отменить
          </button>
          <FormSubmitButtonComponent />
        </div>
      </fieldset>
    </form>
  );
};
