import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET() {
  revalidateTag("tasks");

  return NextResponse.json({ message: "no add events" });
}
