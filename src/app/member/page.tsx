"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MemeberPage() {
  // console.log(params);
  const { data: session, status } = useSession();

  if (status === "loading" || status === "unauthenticated") {
    return (
      <section className="w-fit mx-auto mt-10">
        <h4>Loading...</h4>
        <Link
          href={"/enter"}
          scroll={false}
          className="w-[100px] h-[32px] rounded-md bg-sky-500 text-white text-[0.8rem] mt-5 cursor-pointer p-2"
        >
          Авторизоваться
        </Link>
      </section>
    );
  }

  return (
    <section>
      <section className="w-full p-2 flex items-center justify-end space-x-3">
        <span>Привет</span>
        <span className=" text-[2rem] font-semibold uppercase">
          {session?.user.name}
        </span>
      </section>
      <span className="w-fit mx-auto mt-5 block">
        <Link
          href={"/"}
          scroll={false}
          className="w-[100px] h-[32px] rounded-md bg-sky-500 text-white text-[0.8rem] mt-10 cursor-pointer p-2"
        >
          На главную
        </Link>
      </span>
    </section>
  );
}
