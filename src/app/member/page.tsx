"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoaderCalendarComponent } from "@/components/loader/loaderCalendarComponent";
import dynamic from "next/dynamic";
import TrackerDay from "@/components/tasks/trackerDay";
import Loader from "@/components/loader/loaderComp";
import DataChart01 from "@/components/antCharts/dataChart01";
import { memo } from "react";

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

const DynamicTaskNotCompleted = dynamic(
  () =>
    import("@/components/tasks/tasksNotCompleted").then(
      (component) => component.default
    ),
  {
    loading: () => <Loader />,
  }
);

const MemeberPage = memo(() => {
  // console.log(params);
  const { status } = useSession();

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
        <div className="lg:border-r lg:border-b border-slate-200 lg:p-2">
          <DynamicCalendar />
        </div>

        <div className="p-1 border-t lg:border-l lg:border-t-0 lg:border-b border-slate-200 md:p-2 min-h-[20vh] lg:p-4 w-full lg:mx-auto aspect-video">
          <DataChart01 />
        </div>

        <div className="border-t lg:border-r border-slate-200 p-2">
          <TrackerDay />
          <DynamicTasksExists />
        </div>

        <div className="p-0 border-t lg:border-l border-slate-200 md:p-2 min-h-[20vh]">
          <DynamicTaskNotCompleted />
        </div>
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
});

export default MemeberPage;
