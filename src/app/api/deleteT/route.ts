import { auth } from "@/auth";
import sql from "@/clientdb/connectdb";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    try {
      await sql`DELETE FROM tasks;`;
    } catch (err) {
      return NextResponse.json({
        message: "Удаление не удалось...",
        error: (err as Error).message,
      });
    }

    revalidateTag("tasks");
    return NextResponse.json({ message: "Удаление из базы!" });
  }
  return NextResponse.json({
    status: 401,
    message: "Пользователь не авторизован",
  });
});
