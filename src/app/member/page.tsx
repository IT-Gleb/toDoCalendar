"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoaderCalendarComponent } from "@/components/loader/loaderCalendarComponent";
import dynamic from "next/dynamic";
import TrackerDay from "@/components/tasks/trackerDay";
import Loader from "@/components/loader/loaderComp";

const DynamicCalendar = dynamic(
  () =>
    import("@/components/Calendar/calendar2/calendarWithMashine").then(
      (component) => component.CalendarWithMashine
    ),
  {
    loading: () => <LoaderCalendarComponent />,
  }
);

const DynamicTasksExists = dynamic(
  () =>
    import("@/components/tasks/tasksExists").then(
      (component) => component.default
    ),
  {
    loading: () => <Loader />,
  }
);

export default function MemeberPage() {
  // console.log(params);
  const { data: session, status } = useSession();

  if (status === "loading" || status === "unauthenticated") {
    return (
      <section className="w-fit mx-auto mt-10 flex flex-col space-y-10">
        <h4>Вы не авторизованы...</h4>
        <Link
          href={"/enter"}
          scroll={false}
          className="max-w-[200px] h-[32px] text-center overflow-hidden rounded-md bg-sky-500 text-white text-[0.8rem] cursor-pointer p-2"
        >
          Авторизоваться
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-[radial-gradient(circle_at_top,theme(colors.white),theme(colors.slate.50),theme(colors.sky.50),theme(colors.sky.100))]">
      {/* Календарь с задачами */}
      <section className="p-0 md:p-2 grid grid-cols-1 auto-rows-max lg:grid-cols-2 gap-2 min-h-[60vh] mt-5">
        <div className="lg:border-r border-b border-slate-400 lg:p-2">
          <DynamicCalendar />
        </div>
        <div className="border-t lg:border-t-0 lg:border-l lg:border-b border-slate-400 p-2">
          <TrackerDay />
          <DynamicTasksExists />
        </div>
        <div className="p-0 border-t lg:border-r border-slate-400 md:p-2 min-h-[20vh]"></div>
        <div className="p-0 border-t lg:border-l border-slate-400 md:p-2 min-h-[20vh]"></div>
      </section>

      <span className="w-fit mx-auto mt-5 block">
        <Link
          href={"/mainTasks"}
          scroll={false}
          className="w-[100px] h-[32px] rounded-md bg-sky-500 text-white text-[0.8rem] mt-10 cursor-pointer p-2"
        >
          К задачам
        </Link>
      </span>
    </section>
  );
}
