"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoaderCalendarComponent } from "@/components/loader/loaderCalendarComponent";
import dynamic from "next/dynamic";

const DynamicCalendar = dynamic(
  () =>
    import("@/components/Calendar/calendar2/calendarWithMashine").then(
      (component) => component.CalendarWithMashine
    ),
  {
    loading: () => <LoaderCalendarComponent />,
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
    <section className="min-h-[80vh]">
      <section className="w-full p-2 flex items-center justify-center flex-wrap space-x-3">
        <div className="text-[1.2rem] text-sky-600 uppercase flex items-center gap-x-4">
          <span className="text-black text-[0.8rem] normal-case">Привет!</span>
          {session?.user.name}
        </div>
        <div>почта: {session?.user.email}</div>
        <div>права: {session?.user.role}</div>
      </section>

      {/* Календарь с задачами */}
      <section className="p-2 grid grid-cols-2 ">
        <DynamicCalendar />
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
