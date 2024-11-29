import Link from "next/link";

const taskElements: string[] = [
  "Позавтракать",
  "Программировать",
  "Пообедать",
  "Программировать",
  "Учить JavaScript",
  "Учить React JS",
  "Учить Next JS",
  "Учить CSS",
  "Учить TailwindCSS",
  "Учить HTML",
  "Учить View JS",
];
type TDivWH = {
  width: number;
  height: number;
};

export default function TasksExists() {
  return (
    <section className="w-fit mx-auto relative overflow-hidden">
      <ul className="p-2 text-[0.9rem]">
        {taskElements
          .sort()
          .reverse()
          .map((item, index, array) => {
            let transp: number = 1;

            if (index > Math.floor(array.length - 8)) {
              transp = 0.6;
            }
            if (index > Math.floor(array.length - 6)) {
              transp = 0.4;
            }
            if (index > Math.floor(array.length - 4)) {
              transp = 0.3;
            }
            if (index > Math.floor(array.length - 2)) {
              transp = 0.15;
            }

            return (
              <li key={index} className="p-1 " style={{ opacity: transp }}>
                {index + 1}.{"   "}
                <Link href={"/"} scroll={false} className="hover:underline">
                  {item}
                </Link>
              </li>
            );
          })}
      </ul>
      {/* <div
        style={{ width: divHeight.width, height: divHeight.height }}
        className={`w-[400px] mix-blend-lighten absolute z-[2] left-0 top-0 bg-[linear-gradient(theme(colors.transparent),theme(colors.slate.400),theme(colors.slate.200))]`}
      ></div> */}
    </section>
  );
}
