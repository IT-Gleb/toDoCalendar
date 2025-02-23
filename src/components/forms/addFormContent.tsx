"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { NameInputComponent } from "./addFormComponents/nameInputComponent";
import { Date1Component } from "./addFormComponents/date1Component";
import { Date2Component } from "./addFormComponents/date2Component";
import { StatusComponent } from "./addFormComponents/statusComponent";
import { FormSubmitButtonComponent } from "../buttons/formSubmitButtonComponent";
import { useFormState } from "react-dom";
import { newTaskAction } from "@/server/actions";
import { useSession } from "next-auth/react";

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

export const AddFormContent = memo(({ paramDay }: { paramDay: string }) => {
  const { data: session } = useSession();
  const [status, formAction] = useFormState(newTaskAction, InitialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<TFormState>(status);

  useEffect(() => {
    if (status.status) {
      formRef.current?.reset();
    }
    setFormStatus(status);
    //console.log(paramDay);
  }, [status]);

  return (
    <form
      ref={formRef}
      action={() => {
        if (formRef.current) {
          InitialState.status = false;
          Object.values(InitialState.messages).forEach((item) => (item = ""));
          setFormStatus(InitialState);
          const dt: FormData = new FormData(formRef.current);

          formAction(dt);
          //formRef.current?.reset();
        }
      }}
      onReset={() => {
        formRef.current?.reset();
        setFormStatus(InitialState);
      }}
      className="bg-[radial-gradient(circle_at_left_top,theme(colors.white),theme(colors.white),theme(colors.sky.50),theme(colors.sky.100),theme(colors.sky.200))]"
    >
      <fieldset className=" w-full p-4 flex flex-col gap-y-6 mb-10 border border-slate-300">
        <legend className="uppercase my-2 p-1">Задача верхнего уровня</legend>
        <input type="hidden" name="currentDate" defaultValue={paramDay} />
        <input
          type="hidden"
          name="key"
          defaultValue={session?.user.userId as string}
        />
        <NameInputComponent />
        {!formStatus.status && formStatus.messages["name"].length > 0 && (
          <div className={"text-[0.8rem] bg-red-500 text-white p-2"}>
            {formStatus.messages["name"]}
          </div>
        )}
        <Date1Component paramDay={paramDay} />
        {!formStatus.status && formStatus.messages["beginDate"].length > 0 && (
          <div className={"text-[0.8rem] bg-red-500 text-white p-2"}>
            {formStatus.messages["beginDate"]}
          </div>
        )}
        <Date2Component paramDay={paramDay} />
        {!formStatus.status && formStatus.messages["endDate"].length > 0 && (
          <div className={"text-[0.8rem] bg-red-500 text-white p-2"}>
            {formStatus.messages["endDate"]}
          </div>
        )}
        <StatusComponent />
        {!formStatus.status && formStatus.messages["status"].length > 0 && (
          <div className={"text-[0.8rem] bg-red-500 text-white p-2"}>
            {formStatus.messages["status"]}
          </div>
        )}
        {formStatus.status && (
          <div className={"text-[0.8rem] bg-green-500 text-white p-2"}>
            {formStatus.messages["success"]}
          </div>
        )}
      </fieldset>
      <div className="w-fit ml-auto p-2">
        <div className="flex items-center gap-x-3">
          <button
            type="reset"
            className="w-[120px] min-h-[30px] text-center text-[0.85rem] p-2 rounded-lg bg-slate-300 text-white active:scale-90 hover:shadow-md hover:bg-slate-600 hover:text-white"
          >
            Очистить
          </button>
          <FormSubmitButtonComponent />
        </div>
      </div>
    </form>
  );
});
