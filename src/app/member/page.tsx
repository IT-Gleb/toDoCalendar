"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
// import { LoaderCalendarComponent } from "@/components/loader/loaderCalendarComponent";
import dynamic from "next/dynamic";
import TrackerDay from "@/components/tasks/trackerDay";
import Loader from "@/components/loader/loaderComp";
import { memo } from "react";
import AudioFilesComponent from "@/components/AudioFiles/audioFilesComponent";
import PopoverComponent from "@/components/popover/popoverComponent";
import { PopoverUp } from "@/utils/functions";
import { CalendarWithMashine } from "@/components/Calendar/calendar2/calendarWithMashine";
//import DataChart01 from "@/components/antCharts/dataChart01";

const DynamicDataChart = dynamic(
  () =>
    import("@/components/antCharts/dataChart01").then(
      (component) => component.DataChart01
    ),
  { loading: () => <Loader /> }
);

// const DynamicCalendar = dynamic(
//   () =>
//     import("@/components/Calendar/calendar2/calendarWithMashine")
//       .then((component) => component.CalendarWithMashine)
//       .catch(),
//   {
//     ssr: false,
//     loading: () => <LoaderCalendarComponent />,
//   }
// );

const DynamicTasksExists = dynamic(
  () =>
    import("@/components/tasks/tasksExists").then(
      (component) => component.default
    ),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const DynamicTaskNotCompleted = dynamic(
  () =>
    import("@/components/tasks/tasksNotCompleted").then(
      (component) => component.default
    ),
  { ssr: false, loading: () => <Loader /> }
);

const MemberPage = memo(() => {
  // console.log(params);
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div className="w-[100px] h-[100px] mx-auto mt-10 text-slate-500">
        <Loader />
      </div>
    );
  }

  if (status === "unauthenticated") {
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

  const handlePopoover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    PopoverUp({ param: "Проверочное сообщение", isError: false });
  };

  // className="bg-[radial-gradient(circle_at_top,theme(colors.white),theme(colors.slate.50),theme(colors.sky.50),theme(colors.sky.100))]"
  return (
    <section className="xl:w-[80%] 2xl:w-[75%] xl:mx-auto bg-none bg-cover bg-center bg-no-repeat bg-fixed bg-white">
      <div className="mb-5 sm:mb-2 md:mb-0">
        <AudioFilesComponent
          paramUser={{
            name: session?.user.name as string,
            userId: session?.user.userId as string,
          }}
        />
      </div>
      {/* Календарь с задачами */}
      <section className="p-0 md:p-2 grid grid-cols-1 auto-rows-max gap-y-5 lg:grid-cols-2 lg:gap-2 min-h-[60vh] mt-1">
        <div className="lg:border-r lg:border-b border-slate-200 lg:p-2">
          <CalendarWithMashine />
        </div>

        <div className="p-1 border-t lg:border-l lg:border-t-0 lg:border-b border-slate-200 md:p-2 min-h-[20vh] lg:p-4 w-full lg:mx-auto">
          <DynamicDataChart />
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
        {/* <Link
          href={"/mainTasks"}
          scroll={false}
          className="w-[100px] h-[32px] rounded-md bg-sky-500 text-white text-[0.8rem] mt-10 cursor-pointer p-2"
        >
          К задачам
        </Link> */}
        <button
          type="button"
          className="active:scale-90 bg-sky-600 text-white text-[clamp(0.6rem,4vw,0.8rem)] w-[80px] p-1 rounded-sm hover:shadow-md hover:shadow-sky-950"
          onClick={handlePopoover}
        >
          OK
        </button>
      </span>
      <PopoverComponent />
    </section>
  );
});

export default MemberPage;
