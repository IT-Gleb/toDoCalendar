"use client";

import { useState } from "react";
import AuthLogOutButton from "../authComponents/authLogOutButton";
import { useSession } from "next-auth/react";

export default function HeaderMemberComponent() {
  const { status, data: session } = useSession();
  const [isShow] = useState<boolean>(status === "authenticated");

  return (
    <section className="sticky top-0 z-10 w-full min-h-[3vh] p-2 bg-sky-500 text-white text-[0.9rem] flex flex-wrap-reverse items-center justify-center md:justify-between gap-x-5 gap-y-5">
      <div className="flex items-center gap-x-4">
        Привет,{" "}
        <span className="uppercase text-[1.4rem] text-yellow-200 font-semibold">
          {session?.user.name}
        </span>
      </div>
      <div
        className="flex items-center gap-x-3 before:content-[''] before:w-[60px] before:h-[10px] 
         before:bg-transparent before:border-double before:border-t-8 before:border-white/55
         after:content-[''] after:w-[60px] after:h-[10px] after:bg-transparent after:border-t-8
          after:border-double after:border-white/55"
      >
        <h2 className="text-[1.6rem] whitespace-nowrap uppercase md:text-[2.8rem] bg-clip-text text-transparent bg-[linear-gradient(90deg,theme(colors.slate.100),theme(colors.yellow.300),theme(colors.green.500),theme(colors.lime.300),theme(colors.green.500),theme(colors.yellow.300),theme(colors.slate.100))] ">
          Ваши задачи
        </h2>
      </div>
      {isShow && <AuthLogOutButton />}
    </section>
  );
}
