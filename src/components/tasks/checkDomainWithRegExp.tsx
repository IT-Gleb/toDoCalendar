import { hasDomain } from "@/utils/functions";
import Link from "next/link";
import React from "react";

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

  return (
    <details className="w-full xl:min-w-[1000px] group">
      <summary className="text-[clamp(0.6rem,4vw,0.8rem)] flex items-center gap-x-2 cursor-pointer">
        <span className="font-materialSymbolsOutlined text-[clamp(0.8rem,4vw,1.2rem)] order-1 place-self-end transition-transform group-open:rotate-[90deg]">
          left_panel_open
        </span>
        <span>Некоторые ссылки</span>
      </summary>
      <ul className="ml-2 flex items-start justify-center flex-wrap gap-x-2 gap-y-2 text-[clamp(0.5rem,4vw,0.8rem)] p-1 font-mono group-open:animate-dialog-open goup">
        {domains.length > 0 &&
          domains.sort().map((item, index) => {
            return (
              <li
                key={index}
                className={`p-1 rounded-md ${
                  index % 2 === 0
                    ? "bg-sky-500 text-sky-50"
                    : "bg-sky-700 text-yellow-300"
                }`}
              >
                <Link
                  href={`${
                    item.includes("localhost")
                      ? "http://" + item
                      : "https://" + item
                  }`}
                  target="_blank"
                  className="flex flex-col items-start gap-x-1"
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
    </details>
  );
};
