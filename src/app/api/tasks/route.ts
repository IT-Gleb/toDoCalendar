import sql from "@/clientdb/connectdb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  //console.log(request.nextUrl.searchParams);
  const date_day = request.nextUrl.searchParams.get("day") ?? "2024-09-25";
  const limit = request.nextUrl.searchParams.get("limit") ?? "10";
  const offset = request.nextUrl.searchParams.get("offset") ?? "0";
  let data: any = {};
  try {
    data =
      await sql`SELECT id, parent_id, name, completed, begin_at, end_at, items FROM tasks WHERE begin_at::date=${date_day} AND isdeleted=false ORDER BY begin_at LIMIT ${limit} OFFSET ${offset}`;
  } catch (err) {
    data = { status: false, message: (err as Error).message };
  }

  return NextResponse.json(data);
}
