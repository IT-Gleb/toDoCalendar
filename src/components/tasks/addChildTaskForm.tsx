import { addItemTask } from "@/server/actions";
import { getNowYear } from "@/utils/functions";
import { nanoid } from "nanoid";
import { memo } from "react";
import { useFormState, useFormStatus } from "react-dom";

const BtnAddTask: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-[80px] h-[32px] rounded-sm bg-sky-500 transition-colors hover:shadow-md hover:bg-sky-600 hover:shadow-sky-800 text-white text-[0.75rem] active:scale-90 p-2 disabled:bg-slate-50 disabled:text-slate-200"
      title="Добавить подзадачу"
      disabled={pending}
    >
      Добавить
    </button>
  );
};

type TChildTaskFormParam = {
  paramItem: Partial<TTask>;
  paramUser: string;
  paramTaskDay: string;
  paramClick(): Promise<void>;
};

const initAdd: "init" | "success" | "error" = "init";

export const AddChildTaskForm: React.FC<TChildTaskFormParam> = memo((param) => {
  const [state, formAction] = useFormState(addItemTask, initAdd);
  //console.log(param.paramTaskDay);

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[75%] lg:w-[60%] flex flex-col mx-auto border-4 border-slate-100 rounded-sm lg:rounded-lg bg-white overflow-hidden text-[0.75rem]">
      <div className="bg-sky-400 text-yellow-50 min-h-[2vh] p-2 flex items-start gap-x-1 justify-between">
        <span className="line-clamp-3">
          Добавить подзадачу к ::
          <span className="text-[0.85] font bold text-yellow-100 line-clamp-2 indent-2">
            {param.paramItem.name}
          </span>
        </span>
        <button
          type="button"
          onClick={async () => await param.paramClick()}
          className="w-[24px] h-[20px] bg-pink-500 text-yellow-50 px-2 py-[2px] text-[0.6rem] font-bold "
          title="Закрыть"
          tabIndex={-1}
        >
          x
        </button>
      </div>
      <article className="p-2 min-h-[10vh] bg-[url('../../assets/images/svg/back02.svg')] bg-no-repeat bg-cover bg-center relative flex-auto">
        <p>{param.paramItem.id}</p>
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
            ? "Ошибка при добавлении задачи. Попробуйте повторить позже."
            : state === "success"
            ? "Подзадача добавлена!"
            : ""}
        </p>
        <form action={formAction} className="mt-5">
          <div className="text-center p-2">
            <input type="hidden" name="taskId" defaultValue={nanoid()} />
            <input type="hidden" name="pId" defaultValue={param.paramItem.id} />
            <input
              type="hidden"
              name="level"
              defaultValue={
                param.paramItem.level !== undefined
                  ? Number(param.paramItem.level) + 1
                  : 1
              }
            />
            <input
              type="hidden"
              name="begin"
              defaultValue={
                param.paramItem.begin_at !== undefined
                  ? (param.paramItem.begin_at as number)
                  : Date.now()
              }
            />
            <input
              type="hidden"
              name="end"
              defaultValue={
                param.paramItem.end_at !== undefined
                  ? (param.paramItem.end_at as number)
                  : Date.now()
              }
            />
            <input type="hidden" name="user" defaultValue={param.paramUser} />
            <input
              type="hidden"
              name="name"
              defaultValue={"rerproba-1 Task-23"}
            />
            <input
              type="hidden"
              name="completed"
              defaultValue={false as unknown as number}
            />
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
            <BtnAddTask />
          </div>
        </form>
      </article>
      <div className="bg-sky-400/75 text-slate-700 min-h-[2vh] p-2 text-center text-[0.7rem] font-mono">
        &copy; by Gleb Torgashin 2021-{getNowYear()}
      </div>
    </div>
  );
});
