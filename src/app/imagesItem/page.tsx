"use client";

import { BackButton } from "@/components/buttons/backButton";
import Loader from "@/components/loader/loaderComp";
import PopoverComponent from "@/components/popover/popoverComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return (
      <div className="w-[40px] h-[40px] mx-auto text-green-500">
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

  return (
    <div className="w-fit mx-auto">
      <BackButton />
      <PopoverComponent />
    </div>
  );
};

export default Page;
