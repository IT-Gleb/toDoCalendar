import sql from "@/clientdb/connectdb";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  await sql`DELETE FROM tasks;`;

  revalidateTag("tasks");
  return NextResponse.json({ message: "Удаление..." });
}
