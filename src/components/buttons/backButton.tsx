import Link from "next/link";
import React, { memo } from "react";

export const BackButton = memo(() => {
  return (
    <Link
      href={"/"}
      scroll={false}
      className="w-[90px] h-[24px] p-1 bg-sky-500 text-slate-100 text-[clamp(0.5rem,3vw,0.75rem)]/[clamp(0.5rem,3vw,0.75rem)]
       flex items-start gap-x-1 hover:shadow-md hover:shadow-sky-700 hover:bg-sky-600 hover:text-white overflow-hidden"
    >
      <span className="font-materialSymbolsOutlined justify-center text-[0.75rem]/[0.75rem]">
        arrow_left_alt
      </span>
      Вернуться
    </Link>
  );
});
