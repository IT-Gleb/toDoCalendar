import { getUserFromDbId } from "@/app/api/actions";
import Link from "next/link";

export default async function MemeberPage({
  params,
}: {
  params: { id: string };
}) {
  // console.log(params);
  const user = await getUserFromDbId(params["id"]);
  if (!user) {
    return (
      <section className="w-fit mx-auto mt-5 flex flex-col items-center justify-center space-y-4">
        Пользователь не найден!
        <Link
          href={"/"}
          scroll={false}
          className="w-fit h-[30px] bg-slate-400 p-1 text-slate-100 text-[0.9rem]"
        >
          На главную
        </Link>
      </section>
    );
  }
  return (
    <section className="w-full p-2 flex items-center justify-end space-x-3">
      <span>Привет</span>
      <span className=" text-[2rem] font-semibold uppercase">
        {user.nickname}
      </span>
    </section>
  );
}
