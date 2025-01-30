import { ModifyItemTask } from "@/server/actions";
import { formatDateToInput, getNowYear, PopoverUp } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import { memo, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { BtnAddTask } from "./formBtnComponent";

const initAdd: "init" | "success" | "error" = "init";

export const ModifyChildTaskForm: React.FC<TChildTaskFormParam> = memo(
  (param) => {
    const [state, formAction] = useFormState(ModifyItemTask, initAdd);
    const [isJsonTask] = useState<boolean>(
      (param.paramItem.level as number) > 0 &&
        typeof param.paramItem.id == "string" &&
        (param.paramItem.id as string).length > 8
    );
    //console.log(param.paramTaskDay);
    const [completedValue, setCompletedValue] = useState<boolean>(
      param.paramItem.completed as boolean
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      //console.log(value);
      setCompletedValue(value === "true" ? true : false);
    };

    useEffect(() => {
      switch (state) {
        case "error":
          PopoverUp({ param: "Задача не изменена! Ошибка!", isError: true });
          break;
      }
    }, [state]);

    return (
      <div className="w-[90%] sm:w-[80%] md:w-[75%] lg:w-[60%] flex flex-col mx-auto border-4 border-slate-100 rounded-sm lg:rounded-lg bg-white overflow-hidden text-[0.75rem]">
        <div className="bg-sky-400 text-sky-800 min-h-[2vh] p-2 flex items-start gap-x-1 justify-between">
          <span className="line-clamp-3">
            Изменить подзадачу ::
            <p className="text-[clamp(0.6rem,2vw,0.9rem)] font bold text-yellow-50 line-clamp-2 indent-2">
              {param.paramItem.name}
            </p>
          </span>
          <button
            type="button"
            onClick={async () => {
              if (param.paramClick) {
                await param.paramClick();
              }
            }}
            className="w-[24px] h-[20px] bg-pink-500 text-yellow-50 px-2 py-[2px] text-[0.6rem] font-bold "
            title="Закрыть"
            tabIndex={-1}
          >
            x
          </button>
        </div>
        <article className="p-2 min-h-[2vh] bg-[url('../../assets/images/svg/back02.svg')] bg-no-repeat bg-cover bg-center relative flex-auto">
          {/* <p>
          {param.paramItem.id} <span>{param.paramItem.level}</span>
          {"          "}
          <span>{isJsonTask ? "true" : "false"}</span>
        </p> */}

          <form action={formAction} className="mt-5">
            <div className="w-full text-center p-2 min-h-[5vh] flex flex-col items-start">
              <label
                title="Задача"
                className=" w-full text-[clamp(0.6rem,2vw,0.8rem)] relative before:content-[attr(title)] before:text-[0.7rem] before:bg-white before:p-1 before:absolute before:left-0 before:top-[-1.2rem] focus-within:before:font-bold focus-within:before:text-sky-700 focus-within:before:animate-pulse"
              >
                <input
                  type="text"
                  name="nameTask"
                  id="nameTask"
                  defaultValue={param.paramItem.name}
                  className="w-[99%] pl-2 py-2 pr-6 bg-transparent focus:bg-[linear-gradient(90deg,theme(colors.white),theme(colors.white),theme(colors.sky.200/70),theme(colors.transparent))] outline-none border-b border-b-slate-300 focus:border-b-sky-600 placeholder:text-slate-300 "
                  maxLength={100}
                  required
                  autoComplete="off"
                  placeholder="назовите задачу"
                />
              </label>
              <div className="mt-6 flex gap-x-8 gap-y-4 items-start flex-wrap md:flex-nowrap">
                <label
                  title="Старт"
                  className=" w-full text-[0.8rem] relative before:content-[attr(title)] before:absolute before:left-0 top-[-1.1rem] before:p-1 before:bg-white before:text-[0.7rem] focus-within:before:font-bold focus-within:before:text-sky-700 focus-within:before:animate-pulse"
                >
                  <input
                    type="datetime-local"
                    name="begin"
                    required
                    className="mt-6 p-2 bg-transparent outline-none border-b border-b-slate-300 focus:bg-[linear-gradient(90deg,theme(colors.white),theme(colors.white),theme(colors.sky.200/70),theme(colors.transparent))] focus:border-b-sky-600"
                    defaultValue={formatDateToInput(
                      isValue(param.paramItem.begin_at)
                        ? (param.paramItem.begin_at as number)
                        : Date.now()
                    )}
                  />
                </label>

                <label
                  title="Финиш"
                  className=" w-full text-[0.8rem] relative before:content-[attr(title)] before:absolute before:left-0 top-[-1.1rem] before:p-1 before:bg-white before:text-[0.7rem] focus-within:before:font-bold focus-within:before:text-sky-700 focus-within:before:animate-pulse"
                >
                  <input
                    type="datetime-local"
                    name="end"
                    className="mt-6 p-2 bg-transparent outline-none border-b border-b-slate-300 focus:bg-[linear-gradient(90deg,theme(colors.white),theme(colors.white),theme(colors.sky.200/70),theme(colors.transparent))] focus:border-b-sky-600"
                    defaultValue={formatDateToInput(
                      isValue(param.paramItem.end_at)
                        ? (param.paramItem.end_at as number)
                        : Date.now()
                    )}
                  />
                </label>
              </div>
              <input
                type="hidden"
                name="taskId"
                defaultValue={param.paramItem.id}
              />
              <input
                type="hidden"
                name="pId"
                defaultValue={param.paramItem.parent_id as string}
              />
              <input
                type="hidden"
                name="level"
                defaultValue={
                  isValue(param.paramItem.level)
                    ? Number(param.paramItem.level)
                    : 1
                }
              />

              <input type="hidden" name="user" defaultValue={param.paramUser} />
              <label
                title="Статус"
                className="mt-3 flex items-center justify-center gap-x-4 border border-slate-500 p-4 rounded-sm text-[0.7rem] relative before:content-[attr(title)] focus-within:border-sky-600 focus-within:before:font-bold before:focus-within:animate-pulse before:focus-within:text-sky-700 before:bg-white before:top-[-0.8rem] before:left-[50%] before:translate-x-[-50%] before:absolute before:text-[0.7rem] before:p-1"
              >
                <label className="flex flex-col gap-y-1 cursor-pointer">
                  <span className=" order-2">Не завершена</span>
                  <input
                    type="radio"
                    name="completed"
                    id="item1"
                    value={"false"}
                    checked={completedValue === false}
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                </label>
                <label className="flex flex-col gap-y-1 cursor-pointer">
                  <span className=" order-2">Завершена</span>
                  <input
                    type="radio"
                    name="completed"
                    id="item2"
                    value={"true"}
                    checked={completedValue === true}
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                </label>
              </label>
              <input
                type="hidden"
                name="taskDay"
                defaultValue={param.paramTaskDay}
              />
              <input
                type="hidden"
                name="maintask"
                defaultValue={param.paramItem.maintask as string}
              />
              <input
                type="hidden"
                name="jsonTask"
                id="jsonTask"
                defaultValue={isJsonTask ? "true" : "false"}
              />
              <div className="mt-8 md:mt-0 self-end">
                <BtnAddTask text="Изменить" />
              </div>
            </div>
          </form>
          <p
            className={`text-white p-2 indent-2 ${
              state === "init"
                ? "bg-transparent"
                : state === "error"
                ? "bg-red-500"
                : state === "success"
                ? "bg-green-500"
                : "bg-transparent"
            }`}
          >
            {state === "init"
              ? ""
              : state === "error"
              ? "Ошибка при изменении задачи. Попробуйте повторить позже."
              : state === "success"
              ? "Подзадача изменена!"
              : ""}
          </p>
        </article>
        <div className="bg-sky-400/75 text-slate-700 min-h-[2vh] p-2 text-center text-[0.7rem] font-mono">
          &copy; by Gleb Torgashin 2021-{getNowYear()}
        </div>
      </div>
    );
  }
);
