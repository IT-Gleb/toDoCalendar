"use client";

import { auth } from "@/auth";
import AudioFilesComponent from "@/components/AudioFiles/audioFilesComponent";
import { BackButton } from "@/components/buttons/backButton";
import { AddFormContent } from "@/components/forms/addFormContent";
import { AddTaskFormComponent } from "@/components/forms/addTaskFormComponent";
import { NoAuthComponent } from "@/components/noAuthComponent";
import PopoverComponent from "@/components/popover/popoverComponent";
import { CheckDomainWithRegExpComponent } from "@/components/tasks/checkDomainWithRegExp";
import { ListTaskComponent } from "@/components/tasks/listTaskComponent";
import { Base_URL, getStringFromDate } from "@/utils/functions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useEffect, useState } from "react";

//export const dynamic = "force-dynamic";

async function getData(
  params: TPostPartialParams
): Promise<TTaskList | TResponseError> {
  const url: string = `${Base_URL}api/tsk`;
  let res: TTaskList | TResponseError = {
    status: "500",
    message: "Ошибка получения данных!",
  };

  //console.log(url);
  try {
    const result = await fetch(
      //`${Base_URL}api/tasks/?day=${params.id}&limit=${params.limit}&offset=${params.offset}&key=${paramUserId}`,
      url,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(params),
        next: { tags: [`task-${params.day}`], revalidate: 3600 },
        signal: AbortSignal.timeout(3000),
      }
    );

    console.log(result);
    if (result.ok) {
      res = await result.json();
      console.log(res);
    }
    if (!result.ok) {
      console.log("Not, ok");
      throw new Error("Ошибка получения данных!");
    }

    return res as TTaskList;
  } catch (err) {
    res = {
      status: "500",
      message:
        "Ошибка получения данных! При доступе к " +
        url +
        " " +
        (err as Error).message,
    };
    return res as TResponseError;
  }
}

export default function TaskPage({ params }: { params: { id: string } }) {
  //Авторизация
  const { status, data: session } = useSession();

  if (status !== "loading" && status === "unauthenticated") {
    return <NoAuthComponent />;
  }

  const [TaskData, setTaskData] = useState<TTaskList | TResponseError>([]);
  const { id } = params;

  //console.log(pageParams);

  //  const TaskData: TTaskList | TResponseError = await getData(pageParams);
  //const TaskData: TTaskList | TResponseError = [];

  useEffect(() => {
    let isSubscribed: boolean = true;

    let uId: string = session?.user.userId as string;
    // let uId: string = "1";
    const pageParams: TPostPartialParams = {
      userid: uId,
      day: id,
      limit: 20,
      offset: 0,
    };
    if (isSubscribed) {
      (async function getResource() {
        const url: string = `/api/tsk`;
        const request = await fetch(url, {
          method: "POST",
          body: JSON.stringify(pageParams),
          next: { revalidate: 3600, tags: [`task-${pageParams.day}`] },
          signal: AbortSignal.timeout(3000),
        });
        const result: TTaskList | TResponseError = await request.json();
        //console.log(result);
        setTaskData(result);
      })();
    }

    return () => {
      isSubscribed = false;
    };
  }, [params]);

  if (!TaskData || (!Array.isArray(TaskData) && "status" in TaskData)) {
    return (
      <div className="w-fit mx-auto mt-5 text-red-500 text-[0.9rem]">
        <div>{(TaskData as TResponseError).status}</div>
        <div>{(TaskData as TResponseError).message}</div>
        <div className="mt-10">
          <Link
            href={{ pathname: "/member" }}
            scroll={false}
            className="bg-sky-600 text-white text-[0.8rem] p-2 rounded-md"
          >
            Вернуться
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-[radial-gradient(ellipse_at_left_top,theme(colors.white),theme(colors.white),theme(colors.rose.100),theme(colors.sky.200))]">
      <section className="flex flex-col w-fit mx-auto items-start space-y-5">
        <span className="mt-5 text-[1rem] font-bold first-letter:uppercase text-sky-800">
          {getStringFromDate(params.id)}
        </span>
        <CheckDomainWithRegExpComponent />
        <AudioFilesComponent
          paramUser={{
            name: session?.user.name as string,
            userId: session?.user.userId as string,
          }}
        />
      </section>
      <section className="w-[96%] md:w-[60%] xl:w-[40%] mx-auto mt-5">
        <AddTaskFormComponent paramDate={id}>
          <AddFormContent paramDay={id} />
        </AddTaskFormComponent>
      </section>
      <section className="w-fit mx-auto mt-5 p-0 sm:p-1 lg:p-2 xl:p-4 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        {/* <ListTableHead /> */}
        <ListTaskComponent paramList={TaskData} paramPage={id} />
      </section>

      <section className="w-fit mx-auto mt-5">
        <BackButton />
      </section>
      <PopoverComponent />
    </div>
  );
}
