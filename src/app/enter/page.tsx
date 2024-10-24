import { section } from "framer-motion/client";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <section className="min-h-screen bg-no-repeat bg-fixed bg-cover bg-[url('../../assets/images/svg/bg-space_production.svg')] bg-center">
      <section className="mt-5 p-1 ">
        <h2 className="w-fit mx-auto p-1">Login page</h2>
      </section>
      <section className="w-fit mx-auto mt-5">
        <Link
          href={"/"}
          scroll={false}
          className="w-[120px] h-[42px] p-2 bg-slate-700 text-white hover:text-yellow-300 hover:bg-sky-700 text-[0.9rem]"
        >
          Вернуться
        </Link>
      </section>
    </section>
  );
}
