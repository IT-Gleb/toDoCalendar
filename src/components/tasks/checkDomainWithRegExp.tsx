"use client";

import { hasDomain } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const CheckDomainWithRegExpComponent = () => {
  const values: string[] = [
    "https://www.google.com",
    "https://www.mail.ru/path",
    "http://www.fastapi.tiangolo.com/about/name",
    "http://localhost:3001/tasks/2025-02-04",
    "www.smurf.ru",
    "https://www.mozilla.org/about",
    "url-my-url",
    "https://anekdotov.net",
    "://www.anekdot.ru",
    "https://www.fishki.net",
    "https://www.habr.ru",
    "jdh jdhf kjfk sjd ",
    "fdfdfdf",
    "https://www.pikabu.ru",
    "https://www.oper.ru",
    "burbick-fat",
    "://gmail.com",
  ];
  let domains: string[] = values
    .map((item) => {
      let domain = hasDomain(item);
      return typeof domain === "string" ? domain : "";
    })
    .reduce((acc, current) => {
      if (current !== "") {
        acc = [...acc, current as never];
      }
      return acc;
    }, []);

  const detailsRef = useRef<HTMLDetailsElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [hasOpen, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(
    domains.length > 0 ? 0 : -1
  );

  const handlerToggle = () => {
    if (detailsRef.current) {
      let isOpen: boolean = detailsRef.current.open;
      setOpen(isOpen);
      // console.log(isOpen);
    }
  };

  const handleDot = (paramIndex: number) => {
    let elem: HTMLElement | undefined = undefined;
    if (ulRef.current) {
      for (const child of ulRef.current.children) {
        let indx = (child as HTMLElement).getAttribute("data-index");
        if (Number(indx) === paramIndex) {
          elem = child as HTMLElement;
          setActiveIndex(Number(indx));
          break;
        }
      }
      if (isValue(elem)) {
        (elem as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <details
      ref={detailsRef}
      className="w-full xl:max-w-[960px] group"
      onToggle={handlerToggle}
    >
      <summary
        className="w-[324px] md:w-[656px] lg:w-[976px] text-[clamp(0.6rem,4vw,0.8rem)] rounded-xl 
      bg-sky-100 px-[6px] py-[1px] flex items-center justify-between gap-x-2 cursor-pointer border border-sky-200 transition-all
       hover:bg-[linear-gradient(to_left,theme(colors.sky.300),theme(colors.sky.200),theme(colors.sky.50))]"
      >
        <span className="font-materialSymbolsOutlined text-[clamp(1rem,4vw,1.5rem)] order-2 place-self-end transition-transform group-open:rotate-[90deg]">
          arrow_right_alt
        </span>
        <span>Некоторые ссылки</span>
        <span>В процессе</span>
      </summary>

      <div
        className="w-[324px] md:w-[656px] lg:w-[976px] h-[256px] overflow-y-hidden overflow-x-scroll relative"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {domains.length > 0 && (
          <ul
            ref={ulRef}
            className={`flex items-start gap-x-2 gap-y-2 text-[clamp(0.5rem,4vw,0.8rem)] p-1 font-mono absolute left-[10px] top-0 ${
              hasOpen ? " opacity-100 animate-dialog-open" : "opacity-0"
            }`}
          >
            {domains.sort().map((item, index) => {
              const testAttr = { "data-index": index.toString() };
              return (
                <li
                  key={index}
                  className={`w-[320px] h-[240px] rounded-xl overflow-hidden ${
                    index % 2 === 0
                      ? "bg-sky-300 text-sky-950"
                      : "bg-sky-400 text-yellow-800"
                  } ${
                    index === activeIndex
                      ? "border-4 border-amber-100 shadow-lg"
                      : ""
                  }`}
                  {...testAttr}
                >
                  <Link
                    href={`${
                      item.includes("localhost")
                        ? "http://" + item
                        : "https://" + item
                    }`}
                    target="_blank"
                    className="flex flex-col items-start gap-x-1 p-1"
                  >
                    <span className="font-materialSymbolsOutlined text-[clamp(0.75rem,4vw,1rem)]">
                      tooltip
                    </span>
                    <span>{item}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ul className="mt-2 w-fit mx-auto flex gap-x-2">
        {domains.length > 0 &&
          domains.map((item, index) => {
            return (
              <button
                key={index + "-" + item}
                className={`w-[10px] h-[10px] rounded-full ${
                  index === activeIndex
                    ? "bg-amber-400 animate-pulse"
                    : "bg-sky-400"
                } active:scale-75`}
                onClick={() => handleDot(index)}
              >
                &nbsp;
              </button>
            );
          })}
      </ul>
    </details>
  );
};
