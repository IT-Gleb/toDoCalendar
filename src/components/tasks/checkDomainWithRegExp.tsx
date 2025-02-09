"use client";

import { hasDomain, randomInteger } from "@/utils/functions";
import { isValue } from "@/utils/tasksFunctions";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useLayoutEffect, useRef, useState } from "react";

type TUrlImage = {
  url: string;
  img: string;
};

const dataIndex: string = "data-index";
const values: TUrlImage[] = [
  { url: "https://www.google.com", img: getImagePath() },
  { url: "https://www.mail.ru/path", img: getImagePath() },
  { url: "http://www.fastapi.tiangolo.com/about/name", img: getImagePath() },
  { url: "http://localhost:3001/tasks/2025-02-04", img: getImagePath() },
  { url: "www.smurf.ru", img: getImagePath() },
  { url: "url-my-url", img: getImagePath() },
  { url: "https://anekdotov.net", img: getImagePath() },
  { url: "://www.anekdot.ru", img: getImagePath() },
  { url: "https://www.fishki.net", img: getImagePath() },
  { url: "https://www.habr.ru", img: getImagePath() },
  { url: "jdh jdhf kjfk sjd ", img: getImagePath() },
  { url: "fdfdfdf", img: getImagePath() },
  { url: "https://www.pikabu.ru", img: getImagePath() },
  { url: "https://www.oper.ru", img: getImagePath() },
  { url: "burbick-fat", img: getImagePath() },
  { url: "://gmail.com", img: getImagePath() },
  { url: "https://lern.javascript.ru", img: getImagePath() },
];

function getImagePath(): string {
  let result: string = "";
  let indx: number = randomInteger(1, 5);
  result = `/images/massage/massage-${indx}.jpg`;

  return result;
}

export const CheckDomainWithRegExpComponent = memo(() => {
  const [domains, setDomains] = useState<TUrlImage[]>([]);

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

  const handleDivClick = (paramMax: number, paramBy: number) => {
    let indx = activeIndex;
    indx += paramBy;
    indx = indx < 0 ? 0 : indx;
    indx = indx >= paramMax ? paramMax - 1 : indx;
    handleDot(indx);
  };

  const handleDot = (paramIndex: number) => {
    let elem: HTMLElement | undefined = undefined;
    if (ulRef.current) {
      for (const child of ulRef.current.children) {
        let indx = (child as HTMLElement).getAttribute(dataIndex);
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

  useLayoutEffect(() => {
    let tmp_domains: TUrlImage[] = [];
    tmp_domains = values
      .map((item) => {
        const tmp: TUrlImage = Object.assign({}, item);
        let domain = hasDomain(item.url);
        tmp.url = typeof domain === "string" ? domain : "";
        return tmp;
      })
      .reduce((acc, current) => {
        if (current.url !== "") {
          acc = [...acc, current as never];
        }
        return acc;
      }, [])
      .sort((a, b) => {
        if (
          (a as TUrlImage).url.toLowerCase() >
          (b as TUrlImage).url.toLowerCase()
        ) {
          return 1;
        } else {
          return -1;
        }
      });

    if (tmp_domains.length > 0) {
      setDomains(tmp_domains);
      setActiveIndex(0);
    }
    //console.log(domains);
  }, []);

  //return null;

  return (
    <details
      ref={detailsRef}
      className="w-full xl:max-w-[960px] group relative"
      onToggle={handlerToggle}
    >
      <summary
        className="w-[324px] md:w-[656px] lg:w-[976px] text-[clamp(0.6rem,4vw,0.8rem)] rounded-xl 
      bg-sky-100 px-[4px] flex items-center justify-between gap-x-2 cursor-pointer border border-sky-200 transition-all
       hover:bg-[linear-gradient(to_left,theme(colors.sky.300),theme(colors.sky.200),theme(colors.sky.50))]"
      >
        <span className="font-materialSymbolsOutlined text-[clamp(1rem,4vw,1.5rem)]/[clamp(1rem,4vw,1.5rem)] order-2 select-none place-self-end transition-transform group-open:rotate-[90deg]">
          arrow_right_alt
        </span>
        <span>Некоторые ссылки</span>
        <span>В процессе</span>
      </summary>

      <button
        type="button"
        className="w-[clamp(36px,42px,48px)] h-[clamp(36px,42px,48px)] rounded-lg bg-white/50 border-4 border-sky-600 select-none font-materialSymbolsOutlined 
        text-[clamp(1rem,2rem,2.5rem)]/[clamp(1rem,2rem,2.5rem)] transition-transform
        text-sky-700 overflow-hidden absolute z-[2] left-0 top-[50%] translate-y-[-50%] cursor-pointer 
        opacity-50 active:scale-90 focus:opacity-100 hover:scale-105 hover:opacity-100"
        onClick={() => handleDivClick(domains.length, -1)}
        title="Назад"
      >
        keyboard_double_arrow_left
      </button>
      <button
        type="button"
        className="w-[clamp(36px,42px,48px)] h-[clamp(36px,42px,48px)] rounded-lg bg-white/50 border-4 border-sky-600 select-none font-materialSymbolsOutlined 
        text-[clamp(1rem,2rem,2.5rem)]/[clamp(1rem,2rem,2.5rem)] transition-transform 
        text-sky-700 overflow-hidden absolute z-[2] lg:-right-3 right-0 top-[50%] translate-y-[-50%] cursor-pointer 
        opacity-50 active:scale-90 focus:opacity-100 hover:scale-105 hover:opacity-100"
        onClick={() => handleDivClick(domains.length, 1)}
        title="Вперед"
      >
        keyboard_double_arrow_right
      </button>

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
            {domains.map((item, index) => {
              const testAttr: { [index: string]: string } = {
                "data-index": index.toString(),
              };
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
                      item.url.includes("localhost")
                        ? "http://" + item.url
                        : "https://" + item.url
                    }`}
                    target="_blank"
                    className="flex flex-col items-start gap-x-1 p-1"
                  >
                    <span className="font-materialSymbolsOutlined text-[clamp(0.75rem,4vw,1rem)]">
                      tooltip
                    </span>
                    <span>{item.url}</span>
                    <Image
                      className="aspect-auto md:aspect-video"
                      src={item.img}
                      alt={item.url}
                      width={320}
                      height={240}
                      priority={false}
                      //placeholder="blur"
                      quality={60}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ul className="mt-2 w-fit mx-auto flex gap-x-2 md:gap-x-3">
        {domains.length > 0 &&
          domains.map((item, index) => {
            return (
              <button
                key={index + "-" + item.url}
                className={`w-[12px] h-[12px] md:w-[15px] md:h-[15px] rounded-full ${
                  index === activeIndex
                    ? "bg-amber-400 animate-pulse"
                    : "bg-transparent border border-sky-500"
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
});
