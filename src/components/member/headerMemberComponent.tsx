"use client";

import { useState } from "react";
import AuthLogOutButton from "../authComponents/authLogOutButton";
import { useSession } from "next-auth/react";

export default function HeaderMemberComponent() {
  const { status } = useSession();
  const [isShow] = useState<boolean>(status === "authenticated");

  return (
    <section className="w-full min-h-[3vh] p-2 bg-sky-500 text-white text-[0.9rem] flex flex-wrap-reverse items-center justify-center md:justify-between gap-x-5 gap-y-5">
      <h2 className="text-[1.6rem] whitespace-nowrap uppercase md:text-[2.8rem] bg-clip-text text-transparent bg-gradient-to-r from-white via-white/10 to-white ">
        Ваши задачи
      </h2>
      {isShow && <AuthLogOutButton />}
    </section>
  );
}
