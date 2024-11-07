"use client";

import { decryptId } from "@/utils/functions";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
    <section className="min-h-[80vh] bg-cover bg-no-repeat bg-center md:bg-top xl:bg-left-top bg-[url('../../assets/images/svg/morning.svg')]">
      <section className="w-full p-2 flex items-center justify-end space-x-3">
        <span>Привет</span>
        <span className=" text-[2rem] font-semibold uppercase">
          {session?.user.name}
        </span>
      </section>
      <div className="mt-5 w-fit mx-auto">
        {session &&
          Object.entries(session?.user).map(([key, value], index) => {
            return (
              <div key={index}>
                {key} = {value}
              </div>
            );
          })}
      </div>
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
