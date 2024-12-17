import { getNowYear } from "@/utils/functions";

export default function FooterMemberComponent() {
  return (
    <footer className="w-full min-h-[10vh] bg-sky-600 text-white text-[0.8rem] p-2 mt-3">
      <ul className="p-2 w-fit mx-auto mt-5">
        <li className="flex items-center gap-x-4">
          <span className="font-matrix text-[1.2rem]">&copy;</span> by Gleb
          Torgashin{" "}
          <span className="font-matrix text-[1.2rem]">2021-{getNowYear()}</span>
        </li>
      </ul>
    </footer>
  );
}
