import { signOut } from "next-auth/react";

export default function AuthLogOutButton() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut({ redirect: true, redirectTo: "/" });
  };

  return (
    // <Link
    //   href={"/api/auth/signout"}
    //   className="max-w-[200px] h-[32px] overflow-hidden rounded-md bg-sky-600 text-white text-[0.8rem] p-2 active:scale-90"
    // >
    //   Разрегистрироваться
    // </Link>
    <button
      type="button"
      onClick={handleClick}
      title="Выйти из системы"
      className="max-w-[200px] h-[32px] overflow-hidden rounded-md bg-sky-600 text-white text-[0.8rem] p-2 active:scale-90"
    >
      Разрегистрироваться
    </button>
  );
}
