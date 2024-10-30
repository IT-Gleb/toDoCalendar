import { auth } from "@/app/auth";
import sql from "@/clientdb/connectdb";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    await sql`DELETE FROM tasks;`;
    revalidateTag("tasks");
    return NextResponse.json({ message: "Удаление..." });
  }
  return NextResponse.json(
    { message: "Пользователь не авторизован" },
    { status: 401 }
  );
});
