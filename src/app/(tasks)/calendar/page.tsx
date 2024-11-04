"use client";

import { LOGINPAGE_PATH } from "@/auth";
import { DaysInYear, DaysToEndOfYear } from "@/utils/functions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CalendarItem() {
  //Авторизация
  const { data: session, status } = useSession();
  const router = useRouter();

  //if (!isAuth) return <NoAuthComponent />;

  useEffect(() => {
    console.log(session, status);
    if (!session) {
      router.replace(LOGINPAGE_PATH);
    }
  }, [session]);

  return (
    <section className="w-fit mx-auto">
      <h2>Дней в году: {DaysInYear()}</h2>
      <h2>Прошло дней в текущем году: {DaysInYear() - DaysToEndOfYear()}</h2>
      <h2 className="w-fit mx-auto mt-5">
        До конца текущего года осталось: {DaysToEndOfYear()}
      </h2>
      <section className="w-fit mx-auto my-10">
        <Link
          href={"/"}
          scroll={false}
          className="w-[120px] min-h-[20px] text-center p-2 bg-slate-500 text-white"
        >
          Вернуться
        </Link>
      </section>
      <section className="mt-10 w-fit mx-auto">
        <div>{session?.user?.userId}</div>
        <div>{session?.user?.role}</div>
        <div>{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </section>
    </section>
  );
}
