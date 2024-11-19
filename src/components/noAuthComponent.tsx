import Link from "next/link";

export const NoAuthComponent = () => {
  return (
    <section className="mt-5">
      <h2 className="w-fit mx-auto mt-2">Пользователь не авторизован...</h2>
      <div className="w-fit mx-auto p-1 mt-5">
        <Link
          href={"/enter"}
          scroll={false}
          className="w-[120px] h-[42px] p-2 bg-slate-600 text-white text-[0.9rem] hover:bg-sky-700"
        >
          Перейти
        </Link>
      </div>
    </section>
  );
};
