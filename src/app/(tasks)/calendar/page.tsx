import { MatrixLineComponent } from "@/components/matrix/matrixLineComponent";
import { DaysInYear, DaysToEndOfYear } from "@/utils/functions";
import Link from "next/link";
//import localFont from "next/font/local";

// const myFont = localFont({
//   src: [
//     { path: "./inter/Inter-Thin.ttf", weight: "100" },
//     { path: "./inter/Inter-Regular.ttf", weight: "400" },
//   ],
//   variable: "--inter-mono",
//   weight: "100 400",
// });

export default async function CalendarItem() {
  return (
    <>
      <section className="w-fit mx-auto">
        <h2>Дней в году: {DaysInYear()}</h2>
        <h2>Прошло дней в текущем году: {DaysInYear() - DaysToEndOfYear()}</h2>
        <h2 className="w-fit mx-auto mt-5">
          До конца текущего года осталось: {DaysToEndOfYear()}
        </h2>
      </section>

      <section className="w-fit mx-auto my-10">
        <Link
          href={"/"}
          scroll={false}
          className="w-[120px] min-h-[20px] text-center p-2 bg-slate-500 text-white"
        >
          Вернуться
        </Link>
      </section>
    </>
  );
}
