"use client";
import { MainMenu } from "@/utils/data";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export const MainMenuComponent = () => {
  const pathname = usePathname();

  return (
    <nav role="navigation" className="w-[90%] mx-auto p-2 mt-2 flex-auto">
      <ul className="w-fit mx-auto flex flex-col lg:flex-row items-start justify-center gap-x-5 uppercase text-[0.85rem]">
        {MainMenu.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={
                pathname
                  .trim()
                  .toLowerCase()
                  .localeCompare(item.slug.trim().toLowerCase())
                  ? "text-white font-normal"
                  : "text-amber-300 font-semibold"
              }
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
