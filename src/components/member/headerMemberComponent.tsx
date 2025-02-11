"use client";

import { useEffect, useRef, useState } from "react";
import AuthLogOutButton from "../authComponents/authLogOutButton";
import { useSession } from "next-auth/react";
import { useHeaderMemberHeight } from "@/store/headeMemberStore";
import { useShallow } from "zustand/shallow";

export default function HeaderMemberComponent() {
  const { status, data: session } = useSession();
  const [isShow] = useState<boolean>(status === "authenticated");

  const sectionRef = useRef<HTMLSourceElement>(null);
  const { memberHeight, setHeaderHeight } = useHeaderMemberHeight(
    useShallow((state) => state)
  );

  //Высота шапки для subMenu
  useEffect(() => {
    const rezObj = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const tmpHeight = entry.borderBoxSize
          ? entry.borderBoxSize[0].blockSize.toFixed() //Высота элемента
          : entry.contentRect.height;
        if (memberHeight !== tmpHeight) {
          setHeaderHeight(Number(tmpHeight));
        }
        //console.log(tmpHeight);
      }
    });
    if (sectionRef.current) {
      rezObj.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        rezObj.unobserve(sectionRef.current);
      }
      rezObj.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-10 w-full min-h-[3vh]  bg-sky-500 text-white text-[0.9rem]"
    >
      <div className="flex flex-wrap-reverse items-center justify-center md:justify-between gap-x-5 gap-y-5 p-2">
        <div
          className="flex items-center gap-x-3 before:content-[''] before:w-[60px] before:h-[10px] 
         before:bg-transparent before:border-double before:border-t-8 before:border-white/55
         after:content-[''] after:w-[60px] after:h-[10px] after:bg-transparent after:border-t-8
          after:border-double after:border-white/55"
        >
          <h2 className="text-[clamp(1.6rem,8vw,3.5rem)] font-stroke-1-white-transparent whitespace-nowrap uppercase bg-clip-text text-transparent bg-[linear-gradient(90deg,theme(colors.transparent),theme(colors.white),theme(colors.green.500),theme(colors.white),theme(colors.green.500),theme(colors.white),theme(colors.transparent))] ">
            Ваши задачи
          </h2>
        </div>
        <div className="flex items-center gap-x-4">
          Привет,{" "}
          <span className="uppercase text-[1.4rem] text-yellow-200 font-semibold">
            {session?.user.name}
          </span>
        </div>
        {isShow && <AuthLogOutButton />}
      </div>
      {isShow && (
        <div className="p-1 w-full bg-sky-400 lg:p-2 text-slate-200">
          <div className="flex items-center justify-center flex-wrap space-x-3 text-[0.8rem]">
            <div>почта: {session?.user.email}</div>
            <div>права: {session?.user.role}</div>
          </div>
        </div>
      )}
    </section>
  );
}
