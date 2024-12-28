import { DeleteTask } from "@/server/actions";
import { getNowYear } from "@/utils/functions";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SbnButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-slate-600 rounded-md text-white text-[0.7rem] p-1 w-[100px] h-[30px] active:scale-90 disabled:bg-slate-50 disabled:text-slate-200"
      disabled={pending}
    >
      OK
    </button>
  );
};

export type TPropertyDeleteTasks = {
  userId: string | undefined | null;
  taskId: string;
  parentId: string;
  mainTask: string;
  paramPage: string;
  taskName: string;
  closeClick(): Promise<void>;
};

const initForm: TFormInitState = "init";

export const DeleteTaskForm: React.FC<TPropertyDeleteTasks> = (param) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(DeleteTask, initForm);

  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    let isSubscibed: boolean = true;
    if (isSubscibed) {
      const tempMsg =
        state === "init"
          ? ""
          : state === "success"
          ? "Успех"
          : state === "error"
          ? "Ошибка"
          : "Не определено";
      setMsg(tempMsg);
    }
    return () => {
      isSubscibed = false;
    };
  }, [state]);

  return (
    <div className="w-[95%] md:[80%] lg:w-[65%] mx-auto flex flex-col bg-white border-4 border-slate-300 text-[0.9rem] rounded-lg overflow-hidden">
      <div className="bg-sky-500 text-white text-[0.8rem] flex items-start justify-between p-2">
        Удаление задачи
        <button
          type="button"
          tabIndex={-1}
          className="w-[20px] h-[20px] px-[2px] py-[1px] bg-pink-600 text-[0.55rem] font-bold"
          onClick={async () => await param.closeClick()}
          title="Закрыть"
        >
          x
        </button>
      </div>
      <div className="min-h-[10vh] pt-2 px-4 bg-[url('../../assets/images/svg/back02.svg')] bg-no-repeat bg-center bg-cover">
        <p className=" border-b border-sky-400">
          Подтвердите удаление задачи.{" "}
        </p>
        <p className=" line-clamp-5 first-letter:uppercase indent-3 mt-6">
          {param.taskName}
        </p>
        <form ref={formRef} action={formAction} className="mt-10 flex flex-col">
          <input
            type="hidden"
            name="userId"
            id="userId"
            defaultValue={param.userId as string}
          />
          <input
            type="hidden"
            name="taskId"
            id="taskId"
            defaultValue={param.taskId}
          />
          <input
            type="hidden"
            name="parentId"
            id="parentId"
            defaultValue={param.parentId}
          />
          <input
            type="hidden"
            name="mainTask"
            id="mainTask"
            defaultValue={param.mainTask}
          />
          <input
            type="hidden"
            name="paramPage"
            id="paramPage"
            defaultValue={param.paramPage}
          />
          <div
            className={`text-white p-2 ${
              state === "error"
                ? "bg-red-500"
                : state === "success"
                ? "bg-green-500"
                : state === "init"
                ? "bg-transparent"
                : "bg-slate-300"
            }`}
          >
            {msg}
          </div>

          <div className="flex items-center justify-center mt-2 pb-2">
            <SbnButton />
          </div>
        </form>
      </div>

      <div className="bg-sky-500 text-[0.75rem] p-2 text-center text-slate-700 font-mono">
        &copy; by Gleb Torgashin 2021-{getNowYear()}
      </div>
    </div>
  );
};
