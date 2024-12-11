import { auth } from "@/auth";
import { ComponentWithDialog } from "@/components/dialog/componentWithDialog";
import { AddFormContent } from "@/components/forms/addFormContent";
import { AddTaskFormComponent } from "@/components/forms/addTaskFormComponent";
import { NoAuthComponent } from "@/components/noAuthComponent";
import { ListTaskComponent } from "@/components/tasks/listTaskComponent";
import { Base_URL, getStringFromDate } from "@/utils/functions";
import Link from "next/link";

export const dynamic = "force-dynamic";

type TTasksParams = {
  id: string;
  limit: number;
  offset: number;
};

async function getData(params: TTasksParams, paramUserId: string) {
  const result = await fetch(
    `${Base_URL}api/tasks/?day=${params.id}&limit=${params.limit}&offset=${params.offset}&key=${paramUserId}`,
    {
      headers: { "Content-Type": "application/json" },
      next: { tags: [`task-${params.id}`], revalidate: 2 },
    }
  );

  if (result.ok) {
    const res = await result.json();
    //console.log(res);
    return res;
  }
}

export default async function TaskPage({ params }: { params: { id: string } }) {
  //Авторизация
  const session = await auth();
  if (!session) {
    return <NoAuthComponent />;
  }

  const { id } = params;
  const pageParams: TTasksParams = { id, limit: 10, offset: 0 };
  let uId: string = session.user.userId as string;
  const TaskData: TTaskList = await getData(pageParams, uId);

  return (
    <>
      <section className="flex flex-col w-fit mx-auto items-start space-y-5">
        <span className="mt-5 text-[1rem] font-bold first-letter:uppercase text-sky-800">
          {getStringFromDate(params.id)}
        </span>
        <ComponentWithDialog />
      </section>
      <section className="w-[96%] md:w-[60%] xl:w-[40%] mx-auto mt-5">
        <AddTaskFormComponent paramDate={id}>
          <AddFormContent paramDay={id} />
        </AddTaskFormComponent>
      </section>
      <section className="w-[96%] md:w-[70%] xl:w-[60%] mx-auto mt-5">
        <ListTaskComponent paramList={TaskData} />
      </section>
      <section className="w-fit mx-auto mt-5">
        <Link
          href={"/"}
          scroll={true}
          className="w-[120px] min-h-[20px] p-1 bg-slate-500 text-white"
        >
          Вернуться
        </Link>
      </section>
    </>
  );
}
