"use client";

import { BackButton } from "@/components/buttons/backButton";
import { AddFormContent } from "@/components/forms/addFormContent";
import { AddTaskFormComponent } from "@/components/forms/addTaskFormComponent";
import Loader from "@/components/loader/loaderComp";
import { NoAuthComponent } from "@/components/noAuthComponent";
import PopoverComponent from "@/components/popover/popoverComponent";
import { CheckDomainWithRegExpComponent } from "@/components/tasks/checkDomainWithRegExp";
import { ListTaskComponent } from "@/components/tasks/listTaskComponent";
import { getStringFromDate } from "@/utils/functions";

import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";

//export const revalidate = 3600;
//export const dynamic = "force-dynamic";

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   return {
//     title: `[${params.id}]-Страница`,
//     description: `Страница с данными за ${params.id}`,
//   };
// }

type TRequestError = {
  ok: boolean;
  status: number;
  message: string;
};

export default function Page({ params }: { params: { id: string } }) {
  const { status, data: session } = useSession();
  if (status !== "loading" && status === "unauthenticated") {
    return (
      <Suspense fallback={<Loader />}>
        <NoAuthComponent />
      </Suspense>
    );
  }

  const [reqError, setReqError] = useState<TRequestError>({
    ok: false,
    status: 0,
    message: "",
  });

  const [paramPage, setParamPage] = useState<TPostPartialParams>({
    day: params.id,
    limit: 20,
    offset: 0,
    userid: session?.user.userId as string,
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TTaskList>([]);

  useEffect(() => {
    let isSubscribed: boolean = true;

    setParamPage({
      day: params.id,
      limit: 20,
      offset: 0,
      userid: session?.user.userId as string,
    });

    if (isSubscribed) {
      (async function getData() {
        setReqError({ ok: false, status: 0, message: "" });
        setLoading(true);
        const url: string = "/api/tsk";
        try {
          const request = await fetch(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(paramPage),
            signal: AbortSignal.timeout(3000),
            next: { tags: [`task-${params.id}`], revalidate: 10 },
            cache: "force-cache",
          });
          let data: TTaskList = [];
          if (!request.ok) {
            throw new Error(
              "Ошибка при получении данных из источника - " + url
            );
          }
          if (request.ok) {
            data = await request.json();
          }
          if (data) {
            setTasks(data);
          }
        } catch (err) {
          if (
            (err as Error).name === "AbortError" ||
            (err as Error).name === "TimeoutError"
          ) {
            getData();
          }
          setReqError({
            ok: true,
            status: 503,
            message: (err as Error).message,
          });

          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }

    return () => {
      isSubscribed = false;
    };
  }, [params.id]);

  if (isLoading) {
    return (
      <div className=" w-[50px] h-[50px] mx-auto text-sky-500 ">
        <Loader />
      </div>
    );
  }

  if (reqError.ok) {
    return (
      <div className="text-[clamp(0.7rem,4vw,0.8rem)] text-red-600">
        <span className="font-bold">Ошибка - {reqError.status}</span>
        <p>{reqError.message}</p>
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col w-fit mx-auto items-start space-y-5">
        <span className="mt-5 text-[1rem] font-bold first-letter:uppercase text-sky-800">
          {getStringFromDate(params.id)}
        </span>
        <Suspense>
          <CheckDomainWithRegExpComponent />
        </Suspense>
      </section>

      <section className="w-[96%] md:w-[60%] xl:w-[40%] mx-auto mt-5">
        <Suspense>
          <AddTaskFormComponent paramDate={params.id}>
            <AddFormContent paramDay={params.id} />
          </AddTaskFormComponent>
        </Suspense>
      </section>
      <section className="w-fit mx-auto mt-5 p-0 sm:p-1 lg:p-2 xl:p-4 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        {/* <ListTableHead /> */}
        <Suspense>
          <ListTaskComponent paramList={tasks} paramPage={params.id} />
        </Suspense>
      </section>

      <div className="w-fit mx-auto">
        <Suspense>
          <PopoverComponent />
          <BackButton />
        </Suspense>
      </div>
    </>
  );
}
