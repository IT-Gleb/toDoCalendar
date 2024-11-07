"use client";

import { useState } from "react";
import AuthLogOutButton from "../authComponents/authLogOutButton";
import { useSession } from "next-auth/react";

export default function HeaderMemberComponent() {
  const { status } = useSession();
  const [isShow] = useState<boolean>(status === "authenticated");

  return (
    <section className="w-full min-h-[3vh] p-2 bg-sky-500 text-white text-[0.9rem] flex items-center justify-between">
      <h2 className="uppercase text-[2rem] bg-clip-text text-transparent bg-gradient-to-l from-[80%] from-white via-sky-200 ">
        Ваши задачи
      </h2>
      {isShow && <AuthLogOutButton />}
    </section>
  );
}
