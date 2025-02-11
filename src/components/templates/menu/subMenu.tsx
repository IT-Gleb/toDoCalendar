"use client";

import { useHeaderMemberHeight } from "@/store/headeMemberStore";
import Link from "next/link";
import React from "react";

export const SubMenu = () => {
  const topHeight = useHeaderMemberHeight((state) => state.memberHeight);

  return (
    <nav
      role="list"
      className="sticky z-[2] p-1 bg-sky-500 lg:max-w-[300px] h-fit overflow-hidden rounded-ee-md"
      style={{ top: `${topHeight}px` }}
    >
      <ul
        role="navigation"
        className="flex flex-col gap-x-2 gap-y-2 text-[clamp(0.65rem,3vw,0.85rem)]/[clamp(0.65rem,3vw,0.85rem)] text-slate-100"
      >
        <li>
          <details className="group">
            <summary className="flex items-start gap-x-1 cursor-pointer select-none">
              <span className=" font-materialSymbolsOutlined">folder</span>
              <span>Файлы</span>
              <span className="transition-transform font-materialSymbolsOutlined group-open:rotate-90">
                arrow_right
              </span>
            </summary>
            <ul className="ml-2 mt-1 ">
              <li className="border-b border-b-slate-200 p-1">
                <Link
                  href={"/imagesItem"}
                  scroll={false}
                  className="flex items-start gap-x-1 hover:text-white"
                >
                  <span className=" font-materialSymbolsOutlined">image</span>
                  <span className="group-open:animate-dialog-open">
                    Изображения
                  </span>
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
};
