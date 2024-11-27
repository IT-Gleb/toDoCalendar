import sql from "@/clientdb/connectdb";
import { auth } from "@/auth";

import { NextResponse, NextRequest } from "next/server";

import { decryptId } from "@/utils/functions";

// export async function GET(request: NextRequest) {
//   //console.log(request.nextUrl.searchParams);
//   const date_day = request.nextUrl.searchParams.get("day") ?? "2024-09-25";
//   const limit = request.nextUrl.searchParams.get("limit") ?? "10";
//   const offset = request.nextUrl.searchParams.get("offset") ?? "0";
//   let data: any = {};
//   try {
//     data =
//       await sql`SELECT id, parent_id, userid, name, completed, begin_at, end_at, items FROM tasks WHERE begin_at::date=${date_day} AND isdeleted=false ORDER BY begin_at LIMIT ${limit} OFFSET ${offset}`;
//   } catch (err) {
//     data = { status: false, message: (err as Error).message };
//   }

//   return NextResponse.json(data);
// }

export async function handler(request: NextRequest) {
  let userId = request.nextUrl.searchParams.get("key")?.toString() ?? "-1";
  if (userId !== "-1" && userId.trim().length > 5) {
    userId = decryptId(userId);
  }
  const currDate =
    request.nextUrl.searchParams.get("day")?.toString() ?? "2024-11-27";
  const limit = request.nextUrl.searchParams.get("limit")?.toString() ?? "10";
  const offset = request.nextUrl.searchParams.get("offset")?.toString() ?? "0";

  let data: any = {};
  try {
    data =
      await sql`SELECT id, parent_id, userid, name, completed, begin_at, end_at, items FROM tasks WHERE userid=${userId} AND begin_at::date=${currDate} AND isdeleted=false ORDER BY begin_at LIMIT ${limit} OFFSET ${offset}`;
    return NextResponse.json(data);
  } catch (err) {
    data = { status: false, message: (err as Error).message };
    return NextResponse.json(data);
  }
}

export { handler as GET, handler as POST };
